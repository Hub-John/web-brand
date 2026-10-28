#!/bin/bash

echo "Deploying..."

DEPLOYPATH=/home/qag8m8i3jft5/public_html

rm -rf $DEPLOYPATH/*
cp -r dist/* $DEPLOYPATH

echo "Done."
