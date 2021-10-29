import React from 'react';
import { Swiper } from '../../react/swiper';
import { SwiperSlide } from '../../react/swiper-slide';
import { DEFAULT_CONFIG, MULTIPLE_PREFIX } from '../constants';
import transformStyle from '../utils';
import './index.less';
import '../utils.less';

const Multiple = ({ data, config }) => {
  const {
    basicConfig: {
      mode, // 展示模式：单行/多行显示
      rowItemLimit, // 每行显示数量
      ...otherConfig
      /*
        otherConfig: {
          effect, 切换效果
          speed, 每个动画播放时长
          spaceBetween, 每个滑块之间间隙
          direction, 轮播方向
          autoplay: {
            delay, 动画播放间隔时长
            disableOnInteraction, 操作后是否停止自动播放
          }
        }
       */
    },
    contentConfig: {
      backgroundImg: { // 背景图
        display: showSlideBg, // 是否展示
        link: slideBgLink, // 背景图链接
      },
      padding, // 内边距
      title: titleStyle, // 标题样式
      text: textStyle, // 内容样式
      link: fillPicLink, // 内容区域默认背景图
      horizontal: xGap, // 每块展示区域的水平间距
      vertical: yGap, // 每块展示区域的垂直间距
    }
  } = config;

  const listLength = data.length;
  // 多行显示时，一页显示的数量 => 行数 * 每行限制数量
  const spItemLimit = mode * rowItemLimit;
  // 对最后一页的图进行填充
  const filledList = listLength !== 0 && listLength % spItemLimit === 0
    ? data :
    [
      ...data,
      ...(Array.from({ length: spItemLimit - listLength % spItemLimit })
        .map(() => ({
          title: '',
          url: fillPicLink
        })))
    ];
  // 以每页显示最大数量（spItemLimit）进行分组
  const groupList = [];
  filledList.forEach((item, index) => {
    // 页下标
    const pIndex = Math.floor(index / spItemLimit);
    // 行下标（[0, mode - 1]）
    const rIndex = Math.floor(index / rowItemLimit) - mode * pIndex;
    if (!groupList[pIndex]) {
      groupList[pIndex] = [];
    }
    if (!groupList[pIndex][rIndex]) {
      groupList[pIndex][rIndex] = [];
    }
    groupList[pIndex][rIndex].push(item);
  });

  const clsName = `${MULTIPLE_PREFIX}_swiper-box`;
  return (
    <Swiper
      {...DEFAULT_CONFIG} {...otherConfig}
      spaceBetween={otherConfig.direction === 'horizontal' ? xGap : yGap}
    >
      {groupList.map((pageItem, pageIndex) => (
        <SwiperSlide key={pageIndex}>
          <div className="multiple_swiper-page">
            {pageItem.map((rowItem, rowIndex) => (
              <div key={rowIndex} className="multiple_swiper-row">
                {rowItem.map((item, index) => (
                  <div
                    className={clsName}
                    style={{
                      ...transformStyle({ padding }),
                      marginLeft: index > 0 ? xGap : 0,
                      marginTop: rowIndex > 0 ? yGap : 0,
                      backgroundImage: showSlideBg ? `url(${slideBgLink})` : ''
                    }}
                  >
                    <div
                      className={`${clsName}__img`}
                      style={{ backgroundImage: `url(${item.url})` }}
                    />
                    <div
                      className={`${clsName}__title`}
                      style={transformStyle(titleStyle)}
                    >
                      {item.title || '无'}
                    </div>
                    <div style={transformStyle(textStyle)}>
                      <div
                        className={`swiper-ellipsis-${textStyle.maxRows}`}
                        title={item.text}
                      >
                        {item.text || '-'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Multiple;
