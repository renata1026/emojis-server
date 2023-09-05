//we will build an express server

// when our user sends a GET /  we want to send {success: true, message: "Welcome to the Emoji Server"}

import express from 'express';

const app = express();

// our first middleware to tell express to expect json and convert it for us to an object
app.use(express.json());

// route handler
// GET request /
// first argument is the path and the second argument is the cb function to fire (we get req and res arguments for free)
//this creates the server
app.get('/', (req, res) => {
  res.send({ success: true, message: 'Welcome to the Emoji Server' });
});

// GET request /emojis
app.get('/emojis/:emojiId', (req, res) => {
  const { emojiId } = req.params;
  console.log(`Received request for emoji ID: ${emojiId}`);

  // Convert emojiId to a number
  const emojiIdNumber = parseInt(emojiId);

  // The code is checking if the id property of each emoji object in the emojis array (e.id) is equal to the emojiIdNumber (the id provided in the URL).
  const emoji = emojis.find((e) => e.id === emojiIdNumber);
  //
  if (emoji) {
    console.log(`Emoji with ID ${emojiIdNumber} exists`);
    res.json(emoji);
  } else {
    console.log(`Emoji with ID ${emojiIdNumber} does not exist`);
    res
      .status(404)
      .json({ success: false, message: 'Emoji with that id does not exist' });
  }
});

app.post('/emojis', (req, res) => {
  // req.body is the data that the user sends to us
  //   const body = req.body;
  const { name, character } = req.body;

  //make sure that the user enters a name or there will be an error
  if (!name) {
    return res.send({
      success: false,
      message: 'You must provide a name for the emoji',
    });
  }

  // i need to create a new emoji and add it to our "db"
  const emoji = {
    id: emojis.length + 1,
    name: name, // req.body.name
    character: character, // req.body.character
  };

  // add the new emoji to our db
  emojis.push(emoji);
  res.send({ success: true, emoji });
});

app.delete('/emojis/:emojiId', (req, res) => {
  const { emojiId } = req.params;
  // Find the index of the emoji with the specified emojiId in the emojis array
  const emojiIndex = emojis.findIndex((e) => e.id === parseInt(emojiId));

  if (emojiIndex === -1) {
    // Emoji not found
    return res.status(404).json({ success: false, message: 'Emoji not found' });
  }

  // Remove the emoji from the array
  emojis.splice(emojiIndex, 1);

  // Respond with a success message
  res.json({ success: true, message: 'Emoji deleted successfully' });
});

app.put('/emojis/:emojiId', (req, res) => {
  const { emojiId } = req.params;
  // Find the index of the emoji with the specified emojiId in the emojis array
  const emojiIndex = emojis.findIndex((e) => e.id === parseInt(emojiId));

  if (emojiIndex === -1) {
    // Emoji not found
    return res.status(404).json({ success: false, message: 'Emoji not found' });
  }

  //extract the new ID from the request body

  const { newId } = req.body;

  if (!newId) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a new ID for the emoji',
    });
  }

  //create a new array with the updated item
  const updatedEmojis = [...emojis];
  updatedEmojis[emojiIndex] = {
    ...updatedEmojis[emojiIndex], // Copy existing emoji properties
    id: newId, // Update the id property with the new value
  };

  // Respond with the updated emoji
  res.json({ success: true, emoji: updatedEmojis[emojiIndex] });
});

//error handling catch all route
app.use((req, res) => {
  res.send({ success: false, error: 'No route found.' });
});

// express's built in error handling. need 4 parameters to activate
app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

//added port
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

let emojis = [
  { id: 1, character: '😀', name: 'Grinning Face' },
  { id: 2, character: '🚀', name: 'Rocket' },
  { id: 3, character: '🌟', name: 'Star' },
  { id: 4, character: '🎉', name: 'Party Popper' },
  { id: 5, character: '🐱', name: 'Cat Face' },
  { id: 6, character: '🌺', name: 'Hibiscus' },
  { id: 7, character: '🍔', name: 'Hamburger' },
  { id: 8, character: '🚲', name: 'Bicycle' },
  { id: 9, character: '📚', name: 'Books' },
  { id: 10, character: '🎈', name: 'Balloon' },
  { id: 11, character: '🍕', name: 'Pizza' },
  { id: 12, character: '🏖️', name: 'Beach with Umbrella' },
  { id: 13, character: '🎸', name: 'Guitar' },
  { id: 14, character: '🌈', name: 'Rainbow' },
  { id: 15, character: '🌊', name: 'Ocean Wave' },
  { id: 16, character: '🍦', name: 'Ice Cream' },
  { id: 17, character: '🎨', name: 'Artist Palette' },
  { id: 18, character: '🐶', name: 'Dog Face' },
  { id: 19, character: '🌄', name: 'Sunrise Over Mountains' },
  { id: 20, character: '🎓', name: 'Graduation Cap' },
  { id: 21, character: '🍂', name: 'Fallen Leaf' },
  { id: 22, character: '🍁', name: 'Maple Leaf' },
  { id: 23, character: '🎃', name: 'Jack-O-Lantern' },
  { id: 24, character: '🎄', name: 'Christmas Tree' },
  { id: 25, character: '❄️', name: 'Snowflake' },
  { id: 26, character: '🌻', name: 'Sunflower' },
  { id: 27, character: '🌍', name: 'Earth Globe Europe-Africa' },
  { id: 28, character: '🌞', name: 'Sun with Face' },
  { id: 29, character: '🌚', name: 'New Moon Face' },
  { id: 30, character: '🎶', name: 'Musical Notes' },
];
