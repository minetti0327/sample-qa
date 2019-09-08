import moment from "moment";
export default (context, inject) => {
  inject("moment", moment);
};
