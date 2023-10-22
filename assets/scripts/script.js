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
    "#generate-story .generate-btn"
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
  const aboutUsButton = document.getElementById("about-us-button");
  const backButton = document.getElementById("back-button");
  const retryButton = document.getElementById("retry-button");
  const generatedStoryDiv = document.getElementById("generated-story");

  // Opening sequence transitions
  window.setTimeout(showHeadingWelcome, 500);
  window.setTimeout(showHeadingTo, 1700);
  window.setTimeout(showHeadingSpooky, 2600);
  window.setTimeout(fadeOutHeadings, 4000);
  window.setTimeout(hideHeadings, 5200);
  window.setTimeout(showContainer, 5300);
  window.setTimeout(fadeInContainer, 5350);
  window.setTimeout(showSurpriceElement, 8000);
  window.setTimeout(fadeOutWerewolf, 9500);
  window.setTimeout(hideWerewolf, 10600);

  function showHeadingWelcome() {
    document.getElementById("welcome").style.opacity = "1";
  }

  function showHeadingTo() {
    document.getElementById("welcome-to").style.opacity = "1";
  }

  function showHeadingSpooky() {
    document.getElementById("spooky-story-creation").style.opacity = "1";
  }

  function fadeOutHeadings() {
    document.getElementById("welcome-headings").style.opacity = "0";
  }

  function hideHeadings() {
    document.getElementById("welcome-headings").style.display = "none";
  }

  function showContainer() {
    document.getElementById("container").style.display = "flex";
  }

  function fadeInContainer() {
    document.getElementById("container").style.opacity = "1";
  }

  function showSurpriceElement() {
    document.getElementById("audio-control").style.opacity = "1";
    document.getElementById("werewolf-img").style.display = "block";
  }

  function fadeOutWerewolf() {
    document.getElementById("werewolf-img").style.opacity = "0";
  }

  function hideWerewolf() {
    document.getElementById("werewolf-img").style.display = "none";
  }

  // function to popup the pumpkin for only 2 seconds
  const show = (event) => {
    console.log(event);
    document.getElementById("tryme").style.display = "block";
    window.setTimeout(
      "document.getElementById('tryme').style.display = 'none';",
      2000
    );
  };

  // EVENT LISTENERS

  // For the Start Over button on Display Story
  startOverButton.addEventListener("click", resetForm);
  // For the reset button on the Age request page
  resetButton.addEventListener("click", resetForm);
  // For the Start button on Landing Page
  startButton.addEventListener("click", () => {
    goToSection("story-foundation");
  });
  // eventlistener for popping up the pumpkin
  startButton.addEventListener("click", show);
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
  // For the back button on the about section
  backButton.addEventListener("click", () => {
    goToSection("display-story");
  });
  // For the last start-over button to reset the form and go again.
  retryButton.addEventListener("click", resetForm);

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
      nameInput.placeholder = "Enter a name or leave blank";
      nameInput.id = `character${i}-name`;
      nameInput.type = "text";
      nameInput.className = "form-control";
      nameInput.required = true;

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

  aboutUsButton.addEventListener("click", () => {
    goToSection("about-us");
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

    // Display the story using the typing effect
    generatedStoryDiv.innerText = "";
    typeEffect(generatedStoryDiv, storyText, 50);

    goToSection("display-story");
  });

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
  function typeEffect(element, text, delay = 100) {
    let i = 0;
    const typingSound = document.getElementById("typing-sound");

    // Play the audio when typing starts
    typingSound.play();

    const typingInterval = setInterval(function () {
      if (i < text.length) {
        // Handle consecutive newlines as a new paragraph
        if (text.substring(i, i + 2) === "\n\n") {
          element.innerHTML += "<br><br>";
          i += 2; // Increment by 2 to skip both newline characters
        }
        // Handle single newlines as a line break
        else if (text.charAt(i) === "\n") {
          element.innerHTML += "<br>";
          i++;
        } else {
          element.innerHTML += text.charAt(i);
          i++;
        }
      } else {
        clearInterval(typingInterval); // Stop the interval when all characters are displayed
        typingSound.pause(); // Pause the audio
        typingSound.currentTime = 0; // Reset audio to start
      }
    }, delay);
  }

  typingSound.volume = 0.5; // 0.5 is 50% volume (range is 0 to 1)
});

document.getElementById("muteButton").addEventListener("click", function () {
  let audioElement = document.getElementById("typing-sound");
  if (audioElement.muted) {
    audioElement.muted = false;
    // Optionally, change the icon to unmuted version here.
  } else {
    audioElement.muted = true;
    // Optionally, change the icon to muted version here.
  }
});
document
  .getElementById("showFullStoryButton")
  .addEventListener("click", function () {
    // Assuming your story content is in an element with the ID "storyContent"
    let storyElement = document.getElementById("storyContent");

    // Disable any typewriter or progressive display effect you have here.

    storyElement.textContent = "Your entire story text here.";
  });
