import moment from "moment"

export const convertDate = (date: string) => {
  return moment(new Date(Number(date))).calendar()
}

export const convertDateNow = (date: string) => {
  return moment(new Date(Number(date))).fromNow()
}
