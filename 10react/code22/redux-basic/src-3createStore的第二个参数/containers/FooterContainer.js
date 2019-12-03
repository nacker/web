import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'

import Footer from '../components/Footer'

// 给组件传递状态
const mapStateToProps = state => {
  return {
    filter: state.visibilityFilter
  }
}

// 给组件传递方法
const mapDispatchToProps = dispatch => {
  return {
    setFilter(filter) {
      // console.log('mapDispatchToProps：', filter)
      // dispatch( { type: 'SET_VISIBILITY_FILTER', filter: 'active' } )
      dispatch(setVisibilityFilter(filter))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
