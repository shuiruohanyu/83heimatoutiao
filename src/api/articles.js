// 存放文章的所有接口的模块
import axios from '../utils/axios.config'
import API from '../constant/api'
export function getArticles (params) {
  // 获取文章
  return axios({
    url: API.API_ARTICLES,
    params
  })
}
// 获取频道
export function getChannels () {
  return axios({
    url: API.API_CHANNELS
  })
}
// 删除文章
export function delArticles (id) {
  return axios({
    url: `${API.API_ARTICLES}/${id.toString()}`,
    method: 'delete'
  })
}
