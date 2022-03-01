import {FC, useEffect, useState} from "react"
import {Box, Button, Card, CardContent, Chip, Grid, Typography, Alert, AlertTitle, CardMedia} from "@mui/material";
import {useSelector} from "react-redux";
import timeConverter from "../utils/helpers";
import ApiService from "../services/api.service";
import {Article, Check, HourglassBottom, Send} from "@mui/icons-material";
import {NavigateFunction, useNavigate} from "react-router-dom";

const cardContents = [{
  title: 'What is this place?',
  text: "It's a basic automated report system for collecting and serving the work reports. It helps to standardize the reports.",
  image: '/images/what-is-this-place.png'
}, {
  title: 'Do I have to use it?',
  text: 'Of course not; it\'s just a system that makes the reporting process much more manageable. You can also send your report via e-mail.',
  image: '/images/do-i-have-to-use-it.png'
}]

const Home: FC<any> = () => {

    const navigate: NavigateFunction = useNavigate();

    let auth = useSelector((state: any) => state.rootReducer.auth)

    const [reportExist, setReportExist] = useState(false)

    useEffect(() => {
        if (!auth.isLoggedIn) return
        ApiService.get('report/today').then(res => {
            console.log(res);
            if (res.data.content) {
                setReportExist(true)
            }
        })
    }, [])

    function showReportStatus () {
        return (
            <Grid item xs={12} lg={4}>
              <Card sx={{ textAlign: 'center' }}>
                  <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          { timeConverter(new Date(), false)}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Report Status
                      </Typography>
                      <Typography variant="body2">
                          <Chip label={reportExist ? 'Sent' : 'Waiting'} icon={reportExist ? <Check /> : <HourglassBottom />} color={reportExist ? 'success' : 'warning'} />
                      </Typography>
                  </CardContent>
                  <CardContent>
                      <Button onClick={() => navigate(reportExist ? "/my-report" : "/send-report")} startIcon={reportExist ? <Article /> : <Send />} size="small">{reportExist ? 'My Reports' : 'New Report'}</Button>
                  </CardContent>
              </Card>
            </Grid>
        )
    }

    function showStrangerBox () {

      let cards = []

      for (let card in cardContents) {
        cards.push(<Grid item xs={12} md={4} key={card}>
          <Card sx={{ m: 2, height: '100%' }}>
            {cardContents[card].image && <CardMedia
              component="img"
              sx={{ objectFit: 'contain', width: '100%', height: 250, position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
              image={cardContents[card].image}
              alt="Paella dish"
              />}
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {cardContents[card].title}
              </Typography>
              <Typography variant="body2">
                {cardContents[card].text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>)
      }

      return (
        <>

          <Grid item xs={12} justifyContent="center" display="flex" onClick={() => navigate('/login')}>
            <Button variant="contained">Login Now</Button>
          </Grid>

          {cards}
        </>
      )
    }


    return (
        <Grid>
            <Grid item container justifyContent="center">
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Welcome, <b>{auth.isLoggedIn ? auth.user.name : 'Stranger'}</b>
                </Typography>
            </Grid>

            <Grid justifyContent="center" item container sx={{ mt: 0 }} rowSpacing={2}>
                { auth.isLoggedIn && showReportStatus() }
                { !auth.isLoggedIn && showStrangerBox() }
            </Grid>

        </Grid>
    )
}

export default Home