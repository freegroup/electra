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


draw2d.Configuration.factory.createInputPort= (relatedFigure)=> new DecoratedInputPort()
draw2d.Configuration.factory.createOutputPort= (relatedFigure)=> new DecoratedOutputPort()
draw2d.Configuration.factory.createHybridPort= (relatedFigure)=> new DecoratedHybridPort()

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
  LabelInplaceEditor,
  ConnectionRouter,
  CircuitFigure
}
