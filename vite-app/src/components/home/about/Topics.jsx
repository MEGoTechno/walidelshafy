import { Typography, Paper, useTheme } from '@mui/material';
import Grid from '../../../style/vanilla/Grid';
import Section from '../../../style/mui/styled/Section';

const topics = [
  {
    num: '01',
    sym: 'H',
    name: 'الهيدروجين',
    desc: 'معانا هتضمن مركزك بين الأوائل بإذن الله',
    color: '#e1585c'
  },
  {
    num: '02',
    sym: 'He',
    name: 'الهيليوم',
    desc: 'مش هتفضل في مرحلة الخمول، معانا هتفضل دايمًا متفاعل ونشيط',
    color: '#e7c468'
  },
  {
    num: '03',
    sym: 'Fe',
    name: 'الحديد',
    desc: 'هتتدرب على أسئلة من كل المستويات لحد ما تبقى قوي وثابت زي الحديد',
    color: '#7bb499'
  },
  {
    num: '04',
    sym: 'Acid & Bases',
    name: 'الأحماض والقواعد',
    desc: 'هتفهم الـ pH والمعايرة والتعادل، وتحل أي سؤال عليهم بثقة',
    color: '#a58ce0'
  },
  {
    num: '05',
    sym: 'Organic',
    name: 'الكيمياء العضوية',
    desc: 'من أول الألكانات لحد البوليمرات، هنخلي العضوية أسهل مما تتخيل',
    color: '#6c9be0'
  },
  {
    num: '06',
    sym: 'Equation',
    name: 'الاتزان الكيميائي',
    desc: 'هتفهم مبدأ لوشاتيليه وتعرف تفكر في السؤال بدل ما تحفظه',
    color: '#e08a4f'
  },
];

function ElementTile({ topic }) {
  const theme = useTheme()
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2, width: '100%',
        borderColor: theme.palette.primary.light + 50,
        borderWidth: '2px',
        bgcolor: theme.palette.primary.light + 10,
        transition: 'transform .25s ease, border-color .25s ease',
        '&:hover': { transform: 'translateY(-5px)', borderColor: topic.color, bgcolor: topic.color + 10 },
      }}
    >
      <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '.75rem', color: 'text.secondary' }}>
        {topic.num}
      </Typography>
      <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2.1rem', color: topic.color, my: 0.25 }}>
        {topic.sym}
      </Typography>
      <Typography sx={{ fontSize: '.85rem', color: 'text.primary' }}>{topic.name}</Typography>
      <Typography sx={{ fontSize: '.78rem', color: 'text.secondary', mt: 0.5 }}>{topic.desc}</Typography>
    </Paper>
  );
}

export default function Topics() {
  // const [ref, inView] = useReveal();

  return (
    <Section>
      <Grid
        // ref={ref}
        max={4}
        sx={{
          // opacity: inView ? 1 : 0,
          // transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity .7s ease, transform .7s ease',
        }}
      >
        {topics.map((t) => (
          <ElementTile key={t.sym} topic={t} />
        ))}
      </Grid>
    </Section>
  );
}
