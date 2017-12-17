const { groupBy, map } = require('lodash')
const { format } = require('date-fns')

/**
 * {{#get "posts" limit="all" fields="published_at"}}
 *   {{#timeline}}
 *     {{#foreach items}}
 *       <div>{{date month format="MMMM, YYYY"}}({{count}})</div>
 *     {{/foreach}}
 *    {{/timeline}}
 * {{/get}}
 */
function timelineHelper(options) {
  const postsByMonth = groupBy(this.posts, v => format(v.published_at, 'YYYY-MM'))
  const items = map(postsByMonth, (v, k) => ({month: k, count: v.length}))
  return options.fn({items})
}

module.exports = {
  install() {},

  uninstall() {},

  activate(ghost) {
    ghost.helpers.register('timeline', timelineHelper)
  },

  deactivate() {},
}

