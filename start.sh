#!/bin/sh
npm run watch:container &
npx prisma studio &
wait
