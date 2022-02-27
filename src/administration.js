import React          from 'react'
import styled   from 'styled-components'

import UploadForm     from './uploader'

import Paper           from '@material-ui/core/Paper';

const round = `wet_id: Integer
grp_id: Integer
route: Integer
`

const climber = `firstname: String
lastname: String
birthyear: Integer
gender: {M|F}
nation: {IOC Code}
`

const starter = `${round}per_id: Integer`

const result = `${starter}sort_values: Array[Integer],
result_jsonb: Hash
`

const registration = {
  title: 'registration',
  intro: 'Upload a JSON file containing formatted registration list data. Minimal content is an array of hash objects each with the following properties:',
  required: climber,
  comment: 'The server application will ignore entries where the property values given match an existing entry. If present, the following additional properties will be used to create one or more startlists.',
  optional: round,
  url: '/registration/comp'
}

const startlist_generator = {
  title: 'start lists',
  intro: 'Upload a JSON file defining the starters for a competition and round. Multiple startlists can be created from a single file (not recommended)',
  required: starter,
  comment: 'If present, the following additional properties will be used',
  optional: `start_order: Integer
  rank_prev_heat: Integer
  bib_nr: Integer`,
  url: '/startlist/file'
}

const resultlist_generator = {
  title: 'result lists',
  intro: 'Upload a JSON file to overwrite any existing results. Minimal content is an array of has objects each with the following properties:',
  required: result,
  comment: 'WARNING: The server application will perform an unsafe-update, i.e. invalid results can be uploaded',
  url: '/results/file'
}

const Container = styled.div`
  height: 100vh;
  margin-top: 5rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

`

const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 400px;
  width: 275px;
  padding: 1rem;
  margin: 1rem;
`

const VFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

function AdministrationScreen() {
  return (
    <Container>
      <PaperCard {...registration} />
      <PaperCard {...startlist_generator} />
      <PaperCard {...resultlist_generator} />
    </Container>
  )
}

export default AdministrationScreen

function PaperCard(props) {
  return (
    <Card variant="outlined">
    <VFlex>
      <h4 style={{margin: '0 0 1rem 0'}}>{props.title}</h4>
      <div style={{fontSize: '0.8rem'}}>{props.intro}</div>
      <CodeBlock text={props.required} />
      <div style={{fontSize: '0.8rem'}}>{props.comment}</div>
      <CodeBlock text={props.optional} />
    </VFlex>
    <UploadForm url={props.url}/>        
    </Card>
  )
}

function CodeBlock({text, height}) {
  return (
    <div style={{padding: '0.8rem 1rem'}}>
      <code style={{whiteSpace: "pre-line", color: 'blue'}}>{text}</code>
    </div>
  )
}
