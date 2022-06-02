import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';


import { Container, Divider, Grid, ImageListItem, Slider, Stack, TextField, Alert } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Masonry from '@mui/lab/Masonry';

import Card from '@mui/material/Card';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';



// import images from './data'
const api_url = "http://localhost:8080/search"
const img_api_url = "http://localhost:8000"

class DA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posePLTE: 1,
      posePGTE: 0,
      clipPLTE: 1,
      clipPGTE: 0,
      noOfResults: 100,
      startIndex: 0,
      fetching: false,
      errorResponse: "",
      results: []
    }
  }

  componentDidMount() {
    this.search()
  }

  search() {
    this.setState({
      fetching: true,
      errorResponse: ""
    })

    fetch(api_url,
      {
        method: "POST",
        body: JSON.stringify(
          {
            posePLTE: parseFloat(this.state.posePLTE),
            posePGTE: parseFloat(this.state.posePGTE),
            clipPLTE: parseFloat(this.state.clipPLTE),
            clipPGTE: parseFloat(this.state.clipPGTE),
            noOfResults: this.state.noOfResults,
            startIndex: this.state.startIndex,
          }
        )
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          fetching: false,
          results: data.rows
        })
      }).catch((error) => {
        console.log(error.message)
        this.setState({
          fetching: false,
          errorResponse: "Something went wrong"
        })
      });
    return;
  }

  handleInputChange({ target }) {
    var newValue = target.value
    const intFields = ['startIndex', 'noOfResults']
    if (intFields.includes(target.name)) {
      newValue = parseInt(target.value)
    } else {
      newValue = target.value
    }

    this.setState({
      [target.name]: newValue
    })
  }


  render() {
    return (
      <div>
        <Container>
          <Grid padding={2} container>
            <Grid item md={2}>
              <TextField name='posePLTE' label="Pose P lte"
                size="small"
                value={this.state.posePLTE}
                helperText="0-1"
                disabled={this.state.fetching}
                onChange={(e) => { this.handleInputChange(e) }}
              ></TextField>
            </Grid>
            <Grid item md={2}>
              <TextField name='posePGTE' label="Pose P gte" type="number"
                size="small"
                helperText="0-1"
                value={this.state.posePGTE} disabled={this.state.fetching}
                onChange={(e) => { this.handleInputChange(e) }}
              ></TextField>
            </Grid>

            <Grid item md={2}>
              <TextField name='clipPLTE' label="Clip P lte" type="number"
                size="small"
                helperText="0-1"
                value={this.state.clipPLTE} disabled={this.state.fetching}
                onChange={(e) => { this.handleInputChange(e) }}
              ></TextField>
            </Grid>

            <Grid item md={2}>
              <TextField name='clipPGTE' label="Clip P gte" type="number"
                size="small"
                helperText="0-1"
                value={this.state.clipPGTE} disabled={this.state.fetching}
                onChange={(e) => { this.handleInputChange(e) }}
              ></TextField>
            </Grid>

            <Grid item md={2}>

              <TextField name='noOfResults' label="No Of Results" type="number"
                size="small"
                inputProps={{ step: 10 }}
                helperText="1-200"
                value={this.state.noOfResults} disabled={this.state.fetching}
                onChange={(e) => { this.handleInputChange(e) }}
              ></TextField>
            </Grid>
            <Grid item md={2}>
              <TextField name='startIndex' label="Start index" type="number"
                size="small"
                helperText="0-N"
                value={this.state.startIndex} disabled={this.state.fetching}
                onChange={(e) => { this.handleInputChange(e) }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">

            {this.state.errorResponse && (
              <Container>
                <Alert severity="error">{this.state.errorResponse}</Alert>
              </Container>
            )}
            <LoadingButton
              size="small"
              loading={this.state.fetching}
              variant="contained"
              onClick={() => { this.search() }}
            >fetch</LoadingButton>
          </Grid>

        </Container>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Stack>
              {
                this.state.results.length > 0 && (
                  <Container>
                    <Typography variant='h4'>Results</Typography>
                    <Container>
                      <Masonry columns={4} spacing={2}>
                        {this.state.results.map((item, idx) => {
                          var url = "http://localhost:8080/images/" + item[0]
                          return (
                            <Grow in={true}>
                              <ImageListItem>
                                <Card
                                  raised={true}
                                >
                                  <Stack>
                                    <Typography>p1:{item[2]},p2:{item[3]}</Typography>
                                    <CardMedia
                                      component="img"
                                      image={url}
                                    />
                                  </Stack>
                                </Card>

                              </ImageListItem>
                            </Grow>
                          )
                        })}

                      </Masonry>
                    </Container>
                    <Divider></Divider>

                  </Container>

                )
              }
            </Stack>
          </Grid>
        </Grid >
      </div >
    )
  }
}

export default DA;
