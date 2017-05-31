const Util = {
  toCenterVec(pos, center, sec) {
    // fps is 60
    return [
      (center[0] - pos[0]) / sec / 60,
      (center[1] - pos[1]) / sec / 60
    ];
  }
};

export default Util;