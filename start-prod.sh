#!/usr/bin/env bash

# checks if branch has something pending
function parse_git_dirty() {
  git diff --quiet --ignore-submodules HEAD 2>/dev/null; [ $? -eq 1 ]
}

# gets the current git branch
function parse_git_branch() {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"
}

# get last commit hash prepended with @ (i.e. @8a323d0)
function parse_git_hash() {
  git rev-parse --short HEAD 2> /dev/null
}

# DEMO
GIT_BRANCH=$(parse_git_branch)$(parse_git_hash)
echo ${GIT_BRANCH}

sudo docker build \
	-t prod-be \
	-f Dockerfile.prod .
sudo docker rm -f prod-be 2> /prod/null || true
sudo docker run \
	--network=host \
	--restart=unless-stopped \
	--name=prod-be \
	-e GIT_COMMIT="$(parse_git_hash)" \
	-e GIT_BRANCH="$(parse_git_branch)" \
	-d prod-be