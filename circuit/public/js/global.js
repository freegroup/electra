import inlineSVG from "../../common/js/inlineSVG"
import DecoratedHybridPort from "../../common/js/DecoratedHybridPort"
import DecoratedInputPort from "../../common/js/DecoratedInputPort"
import DecoratedOutputPort from "../../common/js/DecoratedOutputPort"
import MarkerFigure from "../../common/js/MarkerFigure"
import MarkerStateAFigure from "../../common/js/MarkerStateAFigure"
import MarkerStateBFigure from "../../common/js/MarkerStateBFigure"

import ConnectionSelectionFeedbackPolicy from "./ConnectionSelectionFeedbackPolicy"
import Connection from "./figures/Connection"
import ProbeFigure from "./figures/ProbeFigure"
import CircuitFigure from "./figures/CircuitFigure"
import ConnectionRouter from "./ConnectionRouter"
import Raft from "./figures/Raft"
import Mousetrap from "mousetrap"
import LabelInplaceEditor from "./LabelInplaceEditor"
import "./util/mousetrap-global"
import "./util/mousetrap-pause"
import hardware from "./hardware"
let markdown = require('markdown-it')()
markdown.use(require("markdown-it-asciimath"))

// Remember old renderer, if overridden, or proxy to default renderer
let defaultRender = markdown.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  let aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }
  return defaultRender(tokens, idx, options, env, self);
};


export default {
  ConnectionSelectionFeedbackPolicy,
  hardware,
  DecoratedInputPort,
  DecoratedOutputPort,
  DecoratedHybridPort,
  MarkerFigure,
  MarkerStateAFigure,
  MarkerStateBFigure,
  Connection,
  Raft,
  ProbeFigure,
  Mousetrap,
  inlineSVG,
  markdown,
  LabelInplaceEditor,
  ConnectionRouter,
  CircuitFigure
}
