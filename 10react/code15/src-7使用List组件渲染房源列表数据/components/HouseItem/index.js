import React from 'react'

import PropTypes from 'prop-types'

import styles from './index.module.scss'

const HouseItem = ({ houseImg, title, desc, tags, price, onClick, style }) => {
  // 注意：因为 找房 房源列表 页面，是通过 react-virtualized 组件渲染出来的，虚拟列表要求必须接收 style 样式！
  // 所以，此处，需要接收到 style 属性，然后进行处理
  return (
    <div className={styles.house} onClick={onClick} style={style}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={`${houseImg}`} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div>
          {tags.map((tag, index) => {
            const tagClass = `tag${index > 2 ? '3' : index + 1}` // tag1 or tag2 or tag3
            return (
              <span
                key={index}
                className={[styles.tag, styles[tagClass]].join(' ')}
              >
                {tag}
              </span>
            )
          })}
        </div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{price}</span> 元/月
        </div>
      </div>
    </div>
  )
}

HouseItem.propTypes = {
  houseImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
}

export default HouseItem
