function getItemGap(rects: ClientRect[], index: number, activeIndex: number) {
  const currentRect = rects[index];
  const previousRect = rects[index - 1];
  const nextRect = rects[index + 1];

  if (!currentRect || (!previousRect && !nextRect)) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect
      ? currentRect.left - (previousRect.left + previousRect.width)
      : nextRect.left - (currentRect.left + currentRect.width);
  }

  return nextRect
    ? nextRect.left - (currentRect.left + currentRect.width)
    : currentRect.left - (previousRect.left + previousRect.width);
}

const defaultScale = {
  scaleX: 1,
  scaleY: 1,
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const customStrategy = (_ref: any) => {
  var _rects$activeIndex;

  let {
    rects,
    activeNodeRect: fallbackActiveRect,
    activeIndex,
    overIndex,
    index,
  } = _ref;
  const activeNodeRect =
    (_rects$activeIndex = rects[activeIndex]) != null
      ? _rects$activeIndex
      : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  const itemGap = getItemGap(rects, index, activeIndex);

  if (index === activeIndex) {
    const newIndexRect = rects[overIndex];

    if (!newIndexRect) {
      return null;
    }

    return {
      x:
        activeIndex < overIndex
          ? newIndexRect.left +
            newIndexRect.width -
            (activeNodeRect.left + activeNodeRect.width)
          : newIndexRect.left - activeNodeRect.left,
      y: 0,
      ...defaultScale,
    };
  }
  // 右、下方向に動くとき
  if (index > activeIndex && index <= overIndex) {
    let newX = -activeNodeRect.width - itemGap;

    // 動作中ノードの2行以上↓の左端ノード専用(X)
    if (
      rects[index].bottom - rects[activeIndex].bottom > 100 &&
      rects[index].bottom - rects[index - 1].bottom > 30
    ) {
      let gap = 1;
      while (true) {
        if (rects[index - gap].bottom - rects[index - gap - 1].bottom > 30) {
          newX = -1 * rects[index - gap].width + rects[index - 1].right - 25;
          break;
        }
        gap++;
      }
    }
    // 動作中ノードの1行以上↓の左端ノード以外(X)
    if (
      rects[index].bottom - rects[activeIndex].bottom > 30 &&
      rects[index].bottom == rects[index - 1].bottom
    ) {
      let gap = 0;
      while (true) {
        if (rects[index - gap].bottom - rects[index - gap - 1].bottom > 30) {
          newX = -1 * rects[index - gap].width;
          break;
        }
        gap++;
      }
    }
    let newY = 0;
    // 動作中ノードの1行以上↓の全ノード(Y)
    if (rects[index].bottom - rects[index - 1].bottom > 30) {
      newY = -60;
    }

    return {
      x: newX,
      y: newY,
      ...defaultScale,
    };
  }

  // 左、上方向に動くとき
  if (index < activeIndex && index >= overIndex) {
    let newX = activeNodeRect.width + itemGap;
    // 動作中ノードの2行以上↑の右端ノード専用(X)
    if (
      rects[activeIndex].bottom - rects[index].bottom > 100 &&
      rects[index + 1].bottom - rects[index].bottom > 30
    ) {
      let gap = 1;
      while (true) {
        if (rects[index + gap + 1].bottom - rects[index + gap].bottom > 30) {
          newX = rects[index + gap].width - rects[index].right + 25;
          break;
        }
        gap++;
      }
    }
    // 動作中ノードの1行以上↑の右端ノード以外(X)
    if (
      rects[activeIndex].bottom - rects[index].bottom > 30 &&
      rects[index].bottom == rects[index + 1].bottom
    ) {
      let gap = 0;
      while (true) {
        if (rects[index + gap + 1].bottom - rects[index + gap].bottom > 30) {
          newX = rects[index + gap].width;
          break;
        }
        gap++;
      }
    }
    let newY = 0;
    // 動作中ノードの1行以上↑の全ノード(Y)
    if (rects[index + 1].bottom - rects[index].bottom > 30) {
      newY = 60;
    }
    return {
      x: newX,
      y: newY,
      ...defaultScale,
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale,
  };
};
