const gtmEventTranslation = {
  click: 'eventTrackerClick',
}

export default class TagManagerEventReducer {
  reduce(data = {}) {
    if (!data.action) return data

    const actionName = `${data.action}`
    const finalData = Object.assign(data, {
      event: `gtm.${gtmEventTranslation[actionName] || actionName}`,
      event_action: data.action,
    })

    if (data.item) finalData.event_label = data.item
    if (data.section) finalData.event_category = data.section

    return finalData
  }
}
