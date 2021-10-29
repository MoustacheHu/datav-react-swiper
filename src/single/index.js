import React from 'react';
import { Swiper } from '../../react/swiper';
import { SwiperSlide } from '../../react/swiper-slide';
import { DEFAULT_CONFIG, SINGLE_PREFIX } from '../constants';
import transformStyle from '../utils';
import './index.less';
import '../utils.less';

const Single = ({ data, config }) => {
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
      horizontal: xGap, // 每块展示区域的水平间距
    },
  } = config;

  const clsName = `${SINGLE_PREFIX}_swiper-box`;
  return (
    <Swiper
      slidesPerView={rowItemLimit}
      {...DEFAULT_CONFIG}
      {...otherConfig}
      spaceBetween={xGap}
    >
      {data.map(item => (
        <SwiperSlide key={item.url}>
          <div
            className={clsName}
            style={{
              backgroundImage: showSlideBg ? `url(${slideBgLink})` : '',
              ...transformStyle({ padding })
            }}
          >
            <div
              className={`${clsName}__img`}
              style={{ backgroundImage: `url(${item.url})` }}
            />
            <div
              className={`${clsName}__title`}
              title={item.title}
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Single;
