class AlgData {
  constructor(
    MST,
    edgeSequence,
    edgesQueues,
    minWeight,
    edgeCompSequence,
    visiteds = [],
  ) {
    this.MST = MST;
    this.edgeSequence = edgeSequence;
    this.edgesQueues = edgesQueues;
    this.minWeight = minWeight;
    this.edgeCompSequence = edgeCompSequence;
    this.visiteds = visiteds;
  }
}

export default AlgData;