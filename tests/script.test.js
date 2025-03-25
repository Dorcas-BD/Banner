global.HTMLElement.prototype.scrollIntoView = jest.fn();

const fs = require("fs");
const path = require("path");
const { fireEvent } = require("@testing-library/dom");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("My Enjoyable Activities Page", () => {
  let nameInput, applyChangesBtn, nameText, checkboxGroup;

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    require("../js/script");

    nameInput = document.getElementById("nameInput");
    activityInput = document.getElementById("activityInput");
    applyChangesBtn = document.getElementById("applyChanges");
    nameText = document.getElementById("nameText");
    activityText = document.getElementById("activityText");
    checkboxGroup = document.querySelector(".checkbox-group");
  });

  test("should change the displayed name when input is updated", () => {
    nameInput.value = "Alice";
    fireEvent.click(applyChangesBtn);
    expect(nameText.textContent).toBe("Alice");
  });

  test("should add a new activity to the checkbox list", () => {
    const customActivityInput = document.getElementById("customActivity");
    const addActivityBtn = document.getElementById("addActivity");

    customActivityInput.value = "Skiing";
    fireEvent.click(addActivityBtn);

    const newCheckbox = [...checkboxGroup.querySelectorAll("label")].find(
      (label) => label.textContent.includes("Skiing")
    );

    expect(newCheckbox).not.toBeNull();
  });

  test("should update selected activities list when checkboxes are checked", () => {
    const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(applyChangesBtn);

    const enjoyList = document.getElementById("enjoyList").textContent;
    expect(enjoyList).toContain("photography");
    expect(enjoyList).toContain("coding");
  });
});
