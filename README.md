ALFBYweb

Passo a passo para uso da aplicação:

1. Clone o repositório utilizando o git para baixar os arquivos do projeto em sua máquina:

        > git clone https://github.com/vinicius1med/ALFBYweb.git
2. Acesse o diretório do projeto clonado (/ALFBYweb).

        > cd ALFBYweb
3. Inicie uma máquina virtual python (virtual environment):

        > python -m venv nome_da_maquina_virtual
4. Ative a máquina virtual:

        #No Windows:
           > nome_da_maquina_virtual\Scripts\activate
        #No Linux/MacOS:
           > source nome_da_maquina_virtual/bin/activate
5. Instale as dependências do projeto listadas no arquivo requirements.txt:

        > pip install -r requirements.txt
6. No arquivo ".env" altere o campo "api_key" para a chave da API (enviada junto da entrega do projeto).

        GOOGLE_API_KEY="api_key"
7. Agora execute o arquivo principal da aplicação:

        > python app.py
8. Por fim, acesse a rota disponibilizada no terminal para visualizar e interagir com a aplicação.

Aproveite!

Link para acesso à documentação: https://drive.google.com/file/d/1kvkQX55X7TGegHSO7UBMaLHDuNy5bv5_/view?usp=drivesdk
