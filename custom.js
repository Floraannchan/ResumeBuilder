$(document).ready(function () {
  $(".repeater").repeater({
    initEmpty: false,

    // Default values for new fields
    defaultValues: {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      professionalSummary: "",
    },

    show: function () {
      $(this).slideDown();
    },

    hide: function (deleteElement) {
      $(this).slideUp(deleteElement);
    },

    limit: 10,
  });
});
