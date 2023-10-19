import React from 'react'

export default function UpcomingMovCard(props: {title: string, poster: string }) {
  return (
    <>
    <h1>{props.title}</h1>
    <img src={`https://dlv.nyc3.cdn.digitaloceanspaces.com/images/${props.poster}`} width="100px" height="100px"/>
    </>
  )
}
