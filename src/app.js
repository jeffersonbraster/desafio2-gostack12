const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
 

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repositore = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(repositore);

  return response.json(repositore);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if(repositoreIndex < 0) {
    return response.status(400).json({error: 'repositore not found'});
  }

  const repositore = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoreIndex].likes
  }

  repositories[repositoreIndex] = repositore;

  return response.json(repositore);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if(repositoreIndex < 0) {
    return response.status(400).json({error: 'repositore not found'});
  }

  repositories.splice(repositoreIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if(repositoreIndex < 0) {
    return response.status(400).json({error: 'repositore not found'});
  }

  const repository = repositories[repositoreIndex];

  repository.likes +=1;


  return response.json(repositories[repositoreIndex]);

});

module.exports = app;
