document.addEventListener("DOMContentLoaded", function () {
  let savedName = localStorage.getItem("name");
  if (savedName) {
    document.getElementById("nameText").textContent = savedName;
    document.getElementById("nameInput").value = savedName;
  }

  let savedActivity = localStorage.getItem("activity");
  if (savedActivity) {
    document.getElementById("activityText").textContent = savedActivity;
    document.getElementById("activityInput").value = savedActivity;
  }

  let savedImage = localStorage.getItem("bgImage");
  if (savedImage) {
    document.querySelector(
      ".hero"
    ).style.backgroundImage = `url('${savedImage}')`;
  }

  let savedActivities =
    JSON.parse(localStorage.getItem("selectedActivities")) || [];
  if (savedActivities.length > 0) {
    updateEnjoyList(savedActivities);
    document
      .querySelectorAll("#activityOptions input[type='checkbox']")
      .forEach((checkbox) => {
        if (savedActivities.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
  }
});

function updateEnjoyList(selectedActivities) {
  let enjoyList = document.getElementById("enjoyList");

  if (selectedActivities.length > 1) {
    let lastActivity = selectedActivities.pop();
    enjoyList.textContent = `Other things I enjoy include ${selectedActivities.join(
      ", "
    )}, and ${lastActivity}.`;
  } else if (selectedActivities.length === 1) {
    enjoyList.textContent = `Other things I enjoy include ${selectedActivities[0]}.`;
  } else {
    enjoyList.textContent =
      "Other things I enjoy include photography, reading novels, and coding.";
  }
}

document.getElementById("applyChanges").addEventListener("click", function () {
  let newName = document.getElementById("nameInput").value.trim();
  if (newName !== "") {
    document.getElementById("nameText").textContent = newName;
    localStorage.setItem("name", newName);
  }

  let newActivity = document.getElementById("activityInput").value.trim();
  if (newActivity !== "") {
    document.getElementById("activityText").textContent = newActivity;
    localStorage.setItem("activity", newActivity);
  }

  let bgImageUpload = document.getElementById("bgImageUpload").files[0];
  if (bgImageUpload) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let imageUrl = e.target.result;
      document.querySelector(
        ".hero"
      ).style.backgroundImage = `url('${imageUrl}')`;
      localStorage.setItem("bgImage", imageUrl);
    };
    reader.readAsDataURL(bgImageUpload);
  }

  let selectedActivities = [];
  document
    .querySelectorAll("#activityOptions input:checked")
    .forEach((checkbox) => {
      selectedActivities.push(checkbox.value);
    });

  localStorage.setItem(
    "selectedActivities",
    JSON.stringify(selectedActivities)
  );
  updateEnjoyList(selectedActivities);

  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("addActivity").addEventListener("click", function () {
  let customActivity = document.getElementById("customActivity").value.trim();
  if (customActivity !== "") {
    let newCheckbox = document.createElement("label");
    newCheckbox.innerHTML = `<input type="checkbox" value="${customActivity}" checked /> ${customActivity}`;
    document.querySelector(".checkbox-group").appendChild(newCheckbox);

    document.getElementById("customActivity").value = "";

    let savedActivities =
      JSON.parse(localStorage.getItem("selectedActivities")) || [];
    savedActivities.push(customActivity);
    localStorage.setItem("selectedActivities", JSON.stringify(savedActivities));

    updateEnjoyList(savedActivities);
  }
});
