OPENAI_API_KEY=;
const apiSecret = OPENAI_API_KEY;
const promptButton = document.getElementById("submit");
const results = [];

console.log(apiSecret);


function apiCall() {
  event.preventDefault();
  console.log("api call function ran")
  const input = document.getElementById("prompt").value.trim();
  console.log(input);
  const data = {
    prompt: input,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
   };
    
   fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiSecret}`,
    },
    body: JSON.stringify(data),
   })
   .then(function (response) {
     if (response.ok) {
       response.json().then(function(data) {
        console.log(data);
        let newResult = {
          "prompt": input,
          "response": data.choices[0].text
        };
        console.log("the result is" + newResult.response);

        results.unshift(newResult);
        console.log(results);
  


        const resultContainer = document.createElement('section');
          const parent = document.getElementById("response_parent_container");
          parent.prepend(resultContainer);
          const responsesPrompt = document.createElement('div');
          const responsesResponse = document.createElement('div');
          resultContainer.appendChild(responsesPrompt);
          resultContainer.appendChild(responsesResponse);
          console.log(results);

          // for (let i = 0; i < results.length; i++) {
            console.log(results)
            // console.log(result.prompt);
            responsesPrompt.innerHTML = "<h3>Prompt:</h3> " + "<p>" + results[0].prompt + "</p>";
            responsesResponse.innerHTML = "<h3>Response:</h3> " + "<p>" + results[0].response + "</p>"; 
        // };
      //   for (let i = 0; i < results.length; i++) {
      //     // console.log(result.prompt);
      //     const resultContainer = document.createElement('div');
      //     const parent = document.getElementById("response_parent_container");
      //     parent.appendChild(resultContainer);
      //     const responsesPrompt = document.createElement('p');
      //     const responsesResponse = document.createElement('p');
      //     resultContainer.appendChild(responsesPrompt);
      //     resultContainer.appendChild(responsesResponse);
      //     responsesPrompt.innerHTML = "<h3>Prompt:</h3> " + results[i].prompt;
      //     responsesResponse.innerHTML = "<h3>Response:</h3> " + results[i].response; 
      // };

        // results.forEach(result => {
        //   console.log(result.prompt);
        //   const resultContainer = document.createElement('div');
        //   const parent = document.getElementById("response_parent_container");
        //   parent.appendChild(resultContainer);
        //   const responsesPrompt = document.createElement('p');
        //   const responsesResponse = document.createElement('p');
        //   resultContainer.appendChild(responsesPrompt);
        //   resultContainer.appendChild(responsesResponse);
        //   responsesPrompt.innerHTML = "Prompt: " + result.prompt;
        //   responsesResponse.innerHTML = "Response: " + result.response; 
        // })
       })
     }

   })
}

promptButton.addEventListener("click", apiCall);