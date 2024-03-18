import Plotly from 'plotly.js-dist'

export function plotly(el, binding) {
  let { data, layout } = binding.value
  let { id } = el
  let config = { displaylogo: false }

  config = binding.value.config? binding.value.config: config

  Plotly.newPlot(id, data, layout, config)
  
  bindings(el)
}

function bindings(ref) {
  // click handler
  ref.on('plotly_click', function (data) {
    console.log('plotly_click', data)
    var pt = (data.points || [])[0]

    if (pt?.location) {
      console.log('plotly_click_location', pt.location)
    }
  })
}