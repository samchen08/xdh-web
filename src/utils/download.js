const TYPE_MAP = {
  'jpg': 'data:image/jpg;base64,',
  'png': 'data:image/png;base64,',
  'csv': 'data:text/csv;charset=utf-8,'
}

/**
 * 数据转文件下载
 * @param type 文件类型
 * @param saveName 保存文件名
 * @param data  base64 数据
 */
export function download (type, saveName, data) {
  let link = document.createElement('a')
  link.download = saveName
  link.href = TYPE_MAP[type] + data
  link.click()
}
