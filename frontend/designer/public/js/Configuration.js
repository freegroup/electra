export default {
  // The designer only ever knows ".shape" — that is the thing it authors. That
  // a component is stored as one ".part" document (with the shape as a member)
  // is a backend detail translated at the /shapes/file boundary; it must not
  // leak into the editor, the URLs, or a shown filename.
  fileSuffix: ".shape",
  fileNew: "NewComponent",
  application: "designer",

  // Opts into the scope-based finder (StorageScreen, Draft, Workspaces, Review),
  // exactly like simulator/author. The designer swaps in its own storage client
  // for open/save (shape-based) but shares everything else. base is where the
  // finder's REST calls go — the shapes service.
  database: {
    base: "../shapes",
    fileSuffix: ".shape",
  },
}
