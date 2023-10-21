document.addEventListener("DOMContentLoaded", () => {
  // constants

  /*Instead of hardcoding the API key directly into your JavaScript code, 
  you can obfuscate it by using techniques like encoding or splitting the key. 
  For instance, you can store the API key in pieces and then combine them at runtime. */
  const part1 = "sk-Rsx0wYVCbTOclMMitntQT3B";
  const part2 = "lbkFJl1s7nH872Fr01UG149UD";

  const apiKey = part1 + part2;

  const spookinessTypeInput = document.getElementById("spookiness-type");
  const numCharactersInput = document.getElementById("num-characters");
  const charactersContainer = document.getElementById("characters-container");
  const generateStoryButton = document.querySelector(
    "#generate-story .btn-primary"
  );
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const startOverButton = document.getElementById("start-over-button");
  const foundationNextButton = document.getElementById(
    "foundation-next-button"
  );
  const characterNextButton = document.getElementById("character-next-button");
  const ageProceedButton = document.getElementById("age-proceed-button");
  const noButton = document.getElementById("no-button");
  const yesButton = document.getElementById("yes-button");
  const generatedStoryDiv = document.getElementById("generated-story");

  // EVENT LISTENERS

  // For the Start Over button on Display Story
  startOverButton.addEventListener("click", resetForm);
  // For the reset button on the Age request page
  resetButton.addEventListener("click", resetForm);
  // For the Start button on Landing Page
  startButton.addEventListener("click", () => {
    goToSection("story-foundation");
  });
  // For the Next button on Story Foundation
  foundationNextButton.addEventListener("click", () => {
    goToSection("character-generation");
  });
  // For the Next button on Character Generation
  characterNextButton.addEventListener("click", () => {
    goToSection("age-verification");
  });
  // For the Proceed button on Age Verification
  ageProceedButton.addEventListener("click", () => {
    goToSection("generate-story");
  });
  let userSelection = null; // this variable will store the user's choice
  noButton.addEventListener("click", function () {
    userSelection = "no";
  });
  yesButton.addEventListener("click", function () {
    userSelection = "yes";
  });

  ageProceedButton.addEventListener("click", () => {
    const warningText = document.querySelector("#generate-story .warning-text");

    if (userSelection === "no") {
      warningText.textContent =
        "Thank you for being honest! Here's a friendly tale just for you!";
    } else if (userSelection === "yes") {
      warningText.textContent =
        "Dare you summon the tale from the depths of the unknown? Once revealed, its shadows might just cling to your very soul...";
    }

    goToSection("generate-story");
  });

  function goToSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("d-none");
    });
    document.getElementById(sectionId).classList.remove("d-none");
  }

  // Reset the form and go back to landing
  function resetForm() {
    goToSection("landing-section");
  }

  // Function to create character input fields
  function createCharacterInputs(numCharacters) {
    charactersContainer.innerHTML = ""; // Clear the container first

    for (let i = 1; i <= numCharacters; i++) {
      const characterDiv = document.createElement("div");
      characterDiv.className = "character-input mt-4";

      const nameLabel = document.createElement("label");
      nameLabel.htmlFor = `character${i}-name`;
      nameLabel.textContent = `Character ${i} Name:`;
      nameLabel.className = "block";

      const nameInput = document.createElement("input");
      nameInput.id = `character${i}-name`;
      nameInput.type = "text";
      nameInput.className = "form-control";

      const sexLabel = document.createElement("label");
      sexLabel.htmlFor = `character${i}-sex`;
      sexLabel.textContent = `Character ${i} Sex:`;
      sexLabel.className = "block mt-2";

      const sexSelect = document.createElement("select");
      sexSelect.id = `character${i}-sex`;
      sexSelect.className = "form-control";

      const maleOption = document.createElement("option");
      maleOption.value = "male";
      maleOption.textContent = "Male";

      const femaleOption = document.createElement("option");
      femaleOption.value = "female";
      femaleOption.textContent = "Female";

      const otherOption = document.createElement("option");
      otherOption.value = "other";
      otherOption.textContent = "Other";

      sexSelect.append(maleOption, femaleOption, otherOption);

      characterDiv.append(nameLabel, nameInput, sexLabel, sexSelect);
      charactersContainer.appendChild(characterDiv);
    }
  }

  createCharacterInputs(numCharactersInput.value);

  numCharactersInput.addEventListener("change", () => {
    createCharacterInputs(numCharactersInput.value);
  });

  generateStoryButton.addEventListener("click", () => {
    generatedStoryDiv.innerHTML =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    goToSection("display-story");
  });

  // generateStoryButton.addEventListener("click", async () => {
  //   const spookinessType = spookinessTypeInput.value;
  //   const numCharacters = parseInt(numCharactersInput.value, 10);

  //   const characters = [];
  //   for (let i = 1; i <= numCharacters; i++) {
  //     const name = document.getElementById(`character${i}-name`).value;
  //     const sex = document.getElementById(`character${i}-sex`).value;
  //     characters.push({ name, sex });
  //   }

  //   let prompt = `Create a short story in the ${spookinessType} genre. `;
  //   prompt += `The story should have ${numCharacters} main character(s): `;
  //   characters.forEach((char, index) => {
  //     prompt += `${char.name} (${char.sex})${
  //       index === characters.length - 1 ? "." : ", "
  //     }`;
  //   });
  //   prompt += "\n\nStory: ";

  //   const storyText = await generateStory(prompt);

  //   generatedStoryDiv.innerText = storyText;
  //   goToSection("display-story");
  // });

  async function generateStory(prompt) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // some issues with this part.
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1200,
        n: 1,
        stop: null,
        temperature: 1.0,
      }),
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text;
    } else {
      return "An error occurred while generating the story. Please try again.";
    }
  }
});
