import { AppBar, Container, Toolbar, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar >
                    <Grid container>
                    <Grid item xs={12} md={2} lg={2}>        
                            <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Home</Link>
                        </Grid>  
                        <Grid item xs={12} md={2} lg={2}>        
                            <Link to={'/tutorialreact'} style={{textDecoration:'none', color:'white'}}>Tutorial React</Link>
                        </Grid>  
                    </Grid>
                </Toolbar >
            </Container>
        </AppBar>
    );
  }
  
  export default Dashboard;