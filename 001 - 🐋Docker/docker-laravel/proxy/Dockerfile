FROM nginx:1.15.0

# Diretório de trabalho criado para nosso container
WORKDIR /app

# Executa um comando dentro de nossa imagem
RUN apt update && \
    apt install vim -y

# Copia os arquivos de uma pasta local para um diretório no container
COPY html /usr/share/nginx/html

# Porta que sua imagem deixará exposta
EXPOSE 80

# Comando fixo que irá executar
ENTRYPOINT [ "/docker-entrypoint.sh" ]

# Comando variável e substituível que poderá ser executado
CMD [ "nginx", "-g", "daemon off;" ]
