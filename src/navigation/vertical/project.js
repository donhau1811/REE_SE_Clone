import { ROUTER_URL } from '@constants/router'
import project from '@src/assets/images/svg/sidebar/project.svg'
import React from 'react'

export default [
  {
    id: 'project',
    title: 'project',
    icon: <img src={project} alt='project'/>,
    children: [
      {
        id: 'projects',
        title: 'project',
        action: 'manage',
        resource: ROUTER_URL.BILLING_PROJECT,
        navLink: ROUTER_URL.BILLING_PROJECT
      }
    ]
  }
]
