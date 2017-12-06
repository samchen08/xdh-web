export default function (name) {
  return import('./geo/' + name + '.json')
}
