docker run \
  --rm \
  --name node-ddd-clean-arc \
  -it \
  -w "/usr/project" \
  -v "/home/kelp/dev/estudos/Studies-Full-Cycle/009 - Clean Architecture/project":/usr/project \
  node:16 \
  bash