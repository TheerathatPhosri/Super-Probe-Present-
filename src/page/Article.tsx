import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Article = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '5px',
        marginTop: '15px',

      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            sx={{ height: 240 }}
            image="https://healthenvi.com/wp-content/uploads/2021/04/Picture1.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              ผลกระทบจากฝุ่น PM 2.5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button href='/pmcontent' size="small">อ่านเพิ่มเติม</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            sx={{ height: 240 }}
            image="https://intimexchiangmai.com/wp-content/uploads/2017/10/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%9B%E0%B8%81.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              ผลกระทบจากเสียงรบกวน
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button href='/noisecontent' size="small">อ่านเพิ่มเติม</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            sx={{ height: 240 }}
            image="https://static.trueplookpanya.com/tppy/member/m_612500_615000/614766/cms/images/shutterstock_1444894004.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              พยากรณ์อากาศล่วงหน้า
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">อ่านเพิ่มเติม</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            sx={{ height: 240 }}
            image="https://cf.autodeft2.pw/uploads/images/traffic-843309_1920.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              การจราจรติดขัด
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">อ่านเพิ่มเติม</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Article;
