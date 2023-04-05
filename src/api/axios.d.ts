declare module 'axios' {
  interface IAxios<D = null> {
    errCode: number
    errMsg: string
    data: D,
    create: function
  }
  export interface AxiosResponse<T = any> extends IAxios<D> { }
}