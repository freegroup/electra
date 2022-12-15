import Locstor from 'storage-helper'
import * as d3 from "d3"

export default class ProbeWindow {

  constructor(canvas) {
    this.canvas = canvas
    this.visible = false

    // the tick function if the oszi goes from left to the right
    //
    this.rightShiftTick = entry => {
      entry.data.unshift(entry.probe.getValue())
      entry.vis
        .selectAll("path")
        .attr("transform", "translate(-" + this.xScale(1) + ")")
        .attr("d", entry.path)
        .transition()
        .ease(d3.easeLinear)
        //.ease("linear")
        .duration(this.intervalTime)
        .attr("transform", "translate(0)")
      entry.data.pop()
    }

    this.leftShiftTick = entry => {
      entry.data.push(entry.probe.getValue())
      entry.vis
        .selectAll("path")
        .attr("transform", "translate(" + this.xScale(1) + ")")
        .attr("d", entry.path)
        .transition()
        .ease(d3.easeLinear)
        //.ease("linear")
        .duration(this.intervalTime)
        .attr("transform", "translate(0)")
      entry.data.shift()
    }

    $(window).resize(() => this.resize())

    this.canvas.on("probe:add", (emitter, event) => this.addProbe(event.figure))
    this.canvas.on("probe:remove", (emitter, event) => this.removeProbe(event.figure))

    this.channelBufferSize = 500
    this.channelHeight = 20
    this.channelWidth = $("#probe_window").width()
    this.probes = []

    this.xScale = d3.scaleLinear().domain([0, this.channelBufferSize - 1]).range([0, this.channelWidth])
    this.yScale = d3.scaleLinear().domain([0, 5]).range([this.channelHeight, 0])

    $("#probe_window_stick").on("click", () => {
      if (this.visible) {
        this.hide()
      }
      else {
        this.show()
      }
    })
  }


  show() {
    let probes = []

    this.resize()

    // get all probes from the canvas and add them to the window
    //
    this.canvas.getLines().each( (i, line) =>{
      let probe = line.getProbeFigure()
      if (probe !== null) {
        probes.push(probe)
      }
    })

    // sort the probes by the "index" attribute
    //
    probes.sort( (a, b) =>  a.index - b.index)

    $("#probeSortable").remove()
    $("#probe_window").append('<ul id="probeSortable"></ul>')

    probes.forEach( (probe) => this.addProbe(probe))

    if (probes.length > 0)
      $("#probe_hint").hide()
    else
      $("#probe_hint").show()
    $("#probe_window").show().animate({height: '200px'}, 300)
    $("#draw2dCanvasWrapper").animate({bottom: '200px'}, 300)
    $("#probeSortable").sortable({
      update: (event, ui) => {
        let lis = $("#probeSortable li")
        $.each(lis, (index, li) => {
          let probeEntry = this.probes.find( (entry) => {
            return entry.probe.id === li.attributes.id.value
          })
          probeEntry.probe.setIndex(index)
        })
      }
    })
    this.visible = true
  }

  hide() {
    $("#probe_window").animate({height: '0'}, 300)
    $("#draw2dCanvasWrapper").animate({bottom: '0'}, 300, () => {
      $("#probeSortable").remove()
    })
    this.visible = false
  }

  resize() {
    this.channelWidth = $("#probe_window").width()
    this.xScale = d3.scaleLinear().domain([0, this.channelBufferSize - 1]).range([0, this.channelWidth])
    this.yScale = d3.scaleLinear().domain([0, 5]).range([this.channelHeight, 0])

    this.probes.forEach((entry) => entry.svg.attr("width", this.channelWidth))
  }

  tick(intervalTime) {
    // test fiddle for D3 line chart
    // http://jsfiddle.net/Q5Jag/1859/

    this.intervalTime = intervalTime
    this.probes.forEach(this.leftShiftTick)
  }

  resetProbes() {
    this.probes.forEach( (item) => {
      $("#" + item.probe.id).remove()
    })
    this.resize()
    $("#probe_hint").fadeOut()
    this.hide()
  }

  removeProbe(probeFigure) {
    this.probes = $.grep(this.probes, entry => entry.probe !== probeFigure)
    $("#" + probeFigure.id).remove()
    this.resize()
    if (this.probes.length > 0)
      $("#probe_hint").fadeOut()
    else
      $("#probe_hint").fadeIn()
  }

  addProbe(probeFigure) {
    probeFigure.setIndex(this.probes.length)

    let _this = this

    let data = d3.range(this.channelBufferSize).map(() => 0)
    let li = d3.select("#probeSortable").append("li").attr("id", probeFigure.id).attr("index", probeFigure.getIndex())
    let label = li.append("div").text(probeFigure.getText())

    let svg = li.append("svg:svg").attr("width", this.channelWidth).attr("height", this.channelHeight)
    let vis = svg.append("svg:g")
    let path = d3.line()
      .x(function (d, i) {
        return _this.xScale(i)
      })
      .y(function (d, i) {
        return _this.yScale(d)
      })
      .curve(d3.curveStepBefore)
    //   .interpolate("step-before")

    vis.selectAll("path")
      .data([data])
      .enter()
      .append("svg:path")
      .attr("d", path)
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('fill', 'none')

    this.probes.push({
      data: data,
      svg: svg,
      vis: vis,
      path: path,
      probe: probeFigure
    })
    if (this.probes.length > 0)
      $("#probe_hint").hide()
    else
      $("#probe_hint").show()

    // direct edit of the label
    //
    let $label = $(label[0])
    $label.click(function () {

      let $replaceWith = $('<input type="input" class="inplaceEdit" value="' + probeFigure.getText() + '" />')
      $label.hide()
      $label.after($replaceWith)
      $replaceWith.focus()

      let fire = function () {
        let newLabel = $replaceWith.val()
        if (newLabel !== "") {
          $replaceWith.remove()
          $label.html(newLabel)
          $label.show()
          probeFigure.setText(newLabel)
        }
        else {
          // get the value and post them here
          $replaceWith.remove()
          $label.show()
        }
      }
      $replaceWith.blur(fire)
      $replaceWith.keypress(function (e) {
        if (e.which === 13) {
          fire()
        }
      })
    })
    this.resize()
  }
}
