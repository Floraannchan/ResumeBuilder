// get image upload

let profilepic = document.getElementById("profile-pic");
let inputpic = document.getElementById("image-upload");

inputpic.addEventListener("change", () => {
  const file = inputpic.files[0];
  const read = new FileReader();
  read.onload = () => {
    const imgUrl = read.result;
    profilepic.src = imgUrl;
  };
  read.readAsDataURL(file); // can allow to use in img src
});

//generate CV

const mainForm = document.getElementById("cv-form");

//user inputs
let firstNameEle = mainForm.firstname,
  lastNameELe = mainForm.lastname,
  cityEle = mainForm.city,
  countryEle = mainForm.country,
  postcodeEle = mainForm.postcode,
  phoneELe = mainForm.phone,
  emailEle = mainForm.email,
  LocationEle = mainForm.location,
  positionELe = mainForm.position,
  imageEle = mainForm.image,
  descriptionELe = mainForm.summary;

//display In CV
const FullNameDisplay = document.getElementById("fullname_dsp");
const ImgDisplay = document.getElementById("img_display");
const positionDisplay = document.getElementById("position_display");
const PhoneDisplay = document.getElementById("phone_display");
const LinkdinDisplay = document.getElementById("linkdin_display");
const LocationDisplay = document.getElementById("location_display");
const EmailDisplay = document.getElementById("email_display");
const SkillDisplay = document.getElementById("skill_display");
const ProjectDisplay = document.getElementById("project_display");
const experienceDisplay = document.getElementById("experience_display");
const expereieneDesDisplay = document.getElementById("expeienceDes_display");
const educationDisplay = document.getElementById("edu_display");
const DescrptionDisplay = document.getElementById("desc_display");
const ImageDisplay = document.getElementById("img_display");

//loop array for repeater input
const LoopRepeater = (attr, ...Lists) => {
  const listLength = Lists.length;
  const ListData = Lists[0].length;
  const tempArray = [];

  for (let i = 0; i < ListData; i++) {
    const DataInput = {};
    for (let j = 0; j < listLength; j++) {
      DataInput[`${attr[j]}`] = Lists[j][i].value;
    }
    tempArray.push(DataInput);
  }
  return tempArray;
};

const getUserInput = () => {
  //experience
  const exp_title = document.querySelectorAll(".exp_title");
  const exp_company = document.querySelectorAll(".exp_company");
  const exp_start = document.querySelectorAll(".exp_start");
  const exp_end = document.querySelectorAll(".exp_end");
  const exp_summary = document.querySelectorAll(".exp_summary");

  //projects
  const project_title = document.querySelectorAll(".project_title");
  const project_desc = document.querySelectorAll(".project_description");
  const project_tech = document.querySelectorAll(".project_technologies");
  const project_url = document.querySelectorAll(".project_url");

  //Edu
  const edu_degree = document.querySelectorAll(".edu_degree");

  const edu_school = document.querySelectorAll(".edu_school");
  const edu_schoolLocation = document.querySelectorAll(".edu_schoolLocation");
  const edu_start = document.querySelectorAll(".edu_start");
  const edu_end = document.querySelectorAll(".edu_end");

  //skill
  const skill_list = document.querySelectorAll(".skill");
  const skill_level = document.querySelectorAll(".skill_level");

  return {
    firstName: firstNameEle.value,
    lastName: lastNameELe.value,
    Phone: phoneELe.value,
    position: positionELe.value,
    description: descriptionELe.value,
    location: LocationEle.value,
    email: emailEle.value,
    experience: LoopRepeater(
      ["title", "company", "start", "end", "summary"],
      exp_title,
      exp_company,
      exp_start,
      exp_end,
      exp_summary
    ),
    project: LoopRepeater(
      ["name", "description", "language", "Url"],
      project_title,
      project_desc,
      project_tech,
      project_url
    ),
    education: LoopRepeater(
      ["degree", "school", "location", "start", "end"],
      edu_degree,
      edu_school,
      edu_schoolLocation,
      edu_start,
      edu_end
    ),
    skill: LoopRepeater(["skill", "level"], skill_list, skill_level),
  };
};

const displayCV = (userData) => {
  FullNameDisplay.innerHTML = userData.firstName + " " + userData.lastName;
  PhoneDisplay.innerHTML = userData.Phone;
  positionDisplay.innerHTML = userData.position;
  DescrptionDisplay.innerHTML = userData.description;
  LocationDisplay.innerHTML = userData.location;
  EmailDisplay.innerHTML = userData.email;
  showListData(userData.experience, experienceDisplay);
  showListData(userData.project, ProjectDisplay);
  showListData(userData.education, educationDisplay);
  showListData(userData.skill, SkillDisplay);
  console.log(userData.skill);
};

//showListData
showListData = (data, container) => {
  container.innerHTML = ""; //clear inside container
  data.forEach((listItem) => {
    const itemele = document.createElement("div");
    itemele.classList.add("item_div");
    for (let k in listItem) {
      const subSpan = document.createElement("span");
      subSpan.innerHTML = `${listItem[k]}`;
      subSpan.classList.add("item_value");

      //for rating star
      if (k === "level") {
        subSpan.innerHTML = `${getRatingStar([listItem])}`;
      }
      itemele.appendChild(subSpan);
    }
    container.appendChild(itemele);
  });
};
//getratingStar
const getRatingStar = (skills) => {
  if (!Array.isArray(skills)) {
    console.error("Skills data is not an array or is undefined");
    return;
  }

  let stars = skills.map((skill) => {
    let stars = "";
    switch (skill.level.toLowerCase()) {
      case "beginner":
        stars = "⭐";
        break;
      case "intermediate":
        stars = "⭐⭐";
        break;
      case "advanced":
        stars = "⭐⭐⭐";
        break;
      case "expert":
        stars = "⭐⭐⭐⭐";
        break;
      default:
        stars = "";
    }
    return stars;
  });

  return stars; // return the array of stars
};

const generateCV = () => {
  const userData = getUserInput();
  displayCV(userData);
  const star = getRatingStar(userData.skill);
  console.log(userData);
  console.log(star);
};
//print image
function imageUpload() {
  const file = new FileReader();
  file.readAsDataURL(imageEle.files[0]);
  file.onload = function (e) {
    ImageDisplay.src = e.target.result;
  };
}

//print cv
function printCV() {
  window.print();
}
