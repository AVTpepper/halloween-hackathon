document.addEventListener("DOMContentLoaded", () => {
  const spookinessTypeInput = document.getElementById("spookiness-type");
  const numCharactersInput = document.getElementById("num-characters");
  const charactersContainer = document.getElementById("characters-container");
  const generateStoryButton = document.querySelector(
    "#generate-story .btn-primary"
  );
  const generatedStoryDiv = document.getElementById("generated-story");

  // For the Start Over button on Display Story
  document.getElementById("reset-button").addEventListener("click", resetForm);

  document.getElementById("start-button").addEventListener("click", () => {
    goToSection("story-foundation");
  });

  // For the Start button on Landing Page
  document.getElementById("start-button").addEventListener("click", () => {
    goToSection("story-foundation");
  });

  // For the Next button on Story Foundation
  document
    .getElementById("foundation-next-button")
    .addEventListener("click", () => {
      goToSection("character-generation");
    });

  // For the Next button on Character Generation
  document
    .getElementById("character-next-button")
    .addEventListener("click", () => {
      goToSection("age-verification");
    });

  // For the Proceed button on Age Verification
  document
    .getElementById("age-proceed-button")
    .addEventListener("click", () => {
      goToSection("generate-story");
    });

  let userSelection = null; // this variable will store the user's choice

  document.getElementById("no-button").addEventListener("click", function () {
    userSelection = "no";
  });

  document.getElementById("yes-button").addEventListener("click", function () {
    userSelection = "yes";
  });

  document
    .getElementById("age-proceed-button")
    .addEventListener("click", () => {
      const warningText = document.querySelector(
        "#generate-story .warning-text"
      );

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

  generateStoryButton.addEventListener("click", async () => {
    const spookinessType = spookinessTypeInput.value;
    const numCharacters = parseInt(numCharactersInput.value, 10);

    const characters = [];
    for (let i = 1; i <= numCharacters; i++) {
      const name = document.getElementById(`character${i}-name`).value;
      const sex = document.getElementById(`character${i}-sex`).value;
      characters.push({ name, sex });
    }

    let prompt = `Create a short story in the ${spookinessType} genre. `;
    prompt += `The story should have ${numCharacters} main character(s): `;
    characters.forEach((char, index) => {
      prompt += `${char.name} (${char.sex})${
        index === characters.length - 1 ? "." : ", "
      }`;
    });
    prompt += "\n\nStory: ";

    const storyText = await generateStory(prompt);
    
    generatedStoryDiv.innerText = storyText;
    goToSection("display-story");
  });

  async function generateStory(prompt) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer INSERT_SECRET_KEY_HERE", // some issues with this part.
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
