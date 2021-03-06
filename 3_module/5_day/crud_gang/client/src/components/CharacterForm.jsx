import React from "react";
import apiHandler from "../apiHandler/apiHandler";

class CharacterForm extends React.Component {
  state = {
    name: "",
    side: "super-hero",
    bio: "",
    sides: [],
  };

  handleChange = (event) => {
    // console.log(event.target.name);
    let value;
    if (event.target.type === "file") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    this.setState({ [event.target.name]: value });
  };

  handleForm = (event) => {
    event.preventDefault();

    const fd = new FormData();

    fd.append("name", this.state.name);
    fd.append("side", this.state.side);
    fd.append("picture", this.state.picture);
    fd.append("bio", this.state.bio);

    apiHandler
      .post("/api/characters", fd)
      .then((apiResponse) => {
        this.props.history.push("/characters");
      })
      .catch((apiError) => {
        console.log(apiError.response.data.message);
      });
  };

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>

        <div>
          <label htmlFor="side">Side</label>

          <select
            name="side"
            id="side"
            onChange={this.handleChange}
            value={this.state.sides[0]}
          >
            <option value="super-hero">Super hero</option>
            <option value="villain">Villain</option>
          </select>
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <input type="text" id="bio" name="bio" />
        </div>

        <div>
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" name="picture" />
        </div>

        <button>Submit</button>
      </form>
    );
  }
}

export default CharacterForm;
