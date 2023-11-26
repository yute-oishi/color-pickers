// eslint-disable-next-line react/jsx-props-no-spreading
export const customStrategy = (_ref: any) => {
  var _rects$activeIndex;
  const buttonHeight = 50;

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
  // インデックスが大きい側（右、下）方向にドラッグしたとき
  if (index > activeIndex && index <= overIndex) {
    // デフォルトのX移動量(ドラッグしているノードと同じ行内のノードのX移動量)
    let newX = -activeNodeRect.width - itemGap;

    // ドラッグ中ノードの1行以上↓に位置する左端ノード以外のX移動量
    if (
      rects[index].bottom - rects[activeIndex].bottom > buttonHeight &&
      rects[index].bottom == rects[index - 1].bottom
    ) {
      let gap = 0;
      // 移動対象のノードの行の一番左端のノードを検出
      while (true) {
        if (
          rects[index - gap].bottom - rects[index - gap - 1].bottom >
          buttonHeight
        ) {
          newX = -1 * rects[index - gap].width;
          break;
        }
        gap++;
      }
    }

    // ドラッグ中ノードの2行以上↓に位置する左端ノード専用のX移動量
    if (
      rects[index].bottom - rects[activeIndex].bottom > buttonHeight * 2 &&
      rects[index].bottom - rects[index - 1].bottom > buttonHeight
    ) {
      let gap = 1;
      // 移動対象のノードの行の一番左端のノードを検出
      while (true) {
        if (
          rects[index - gap].bottom - rects[index - gap - 1].bottom >
          buttonHeight
        ) {
          newX = -1 * rects[index - gap].width + rects[index - 1].right - 25;
          break;
        }
        gap++;
      }
    }

    // ドラッグ中ノードと同じ行にいるノード専用のY移動量 (デフォルト)
    let newY = 0;

    // 一番左端のノードの場合(移動対象ノードの前のノードが1行上にある場合)
    if (rects[index].bottom - rects[index - 1].bottom > buttonHeight) {
      newY = -60;
    }

    return {
      x: newX,
      y: newY,
      ...defaultScale,
    };
  }

  // インデックスが小さい側（左、上）方向にドラッグしたとき
  if (index < activeIndex && index >= overIndex) {
    // デフォルトのX移動量(ドラッグしているノードと同じ行内のノードのX移動量)
    let newX = activeNodeRect.width + itemGap;

    // ドラッグ中ノードの1行以上↑に位置する右端ノード以外のX移動量
    if (
      rects[activeIndex].bottom - rects[index].bottom > 30 &&
      rects[index].bottom == rects[index + 1].bottom
    ) {
      let gap = 0;
      // 移動対象のノードの行の一番右端のノードを検出
      while (true) {
        if (rects[index + gap + 1].bottom - rects[index + gap].bottom > 30) {
          newX = rects[index + gap].width;
          break;
        }
        gap++;
      }
    }

    // ドラッグ中ノードの2行以上↑に位置する右端ノード専用のX移動量
    if (
      rects[activeIndex].bottom - rects[index].bottom > buttonHeight * 2 &&
      rects[index + 1].bottom - rects[index].bottom > buttonHeight
    ) {
      let gap = 1;
      // 移動対象のノードの行の一番右端のノードを検出
      while (true) {
        if (
          rects[index + gap + 1].bottom - rects[index + gap].bottom >
          buttonHeight
        ) {
          newX = rects[index + gap].width - rects[index].right + 25;
          break;
        }
        gap++;
      }
    }

    let newY = 0;

    // 一番右端のノードの場合(移動対象ノードの次のノードが1行下にある場合)
    if (rects[index + 1].bottom - rects[index].bottom > buttonHeight) {
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

// 同じ行同士、ドラッグ中ノードと移動対象ノード間距離を取得する関数
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

// スケール(ボタンの大きさ)拡大縮小はしない (1固定)
const defaultScale = {
  scaleX: 1,
  scaleY: 1,
};
