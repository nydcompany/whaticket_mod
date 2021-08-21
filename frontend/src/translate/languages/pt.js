const messages = {
  pt: {
    translations: {
      signup: {
        title: "Cadastre-se",
        toasts: {
          success: "Usuário criado com sucesso! Faça seu login!!!.",
          fail: "Erro ao criar usuário. Verifique os dados informados.",
        },
        form: {
          name: "Nome",
          email: "Email",
          password: "Senha",
        },
        buttons: {
          submit: "Cadastrar",
          login: "Já tem uma conta? Entre!",
        },
      },
      login: {
        title: "Login",
        form: {
          email: "Email",
          password: "Senha",
        },
        buttons: {
          submit: "Entrar",
          register: "Não tem um conta? Cadastre-se!",
        },
      },
      auth: {
        toasts: {
          success: "Login efetuado com sucesso!",
        },
      },
      dashboard: {
        charts: {
          perDay: {
            title: "Atendimentos hoje: ",
            titleleft: "Atendimento",
          },
        },
      },
      connections: {
        title: "Conexões",
        toasts: {
          deleted: "Conexão com o WhatsApp excluída com sucesso!",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage: "Você tem certeza? Essa ação não pode ser revertida.",
          disconnectTitle: "Desconectar",
          disconnectMessage:
            "Tem certeza? Você precisará ler o QR Code novamente.",
        },
        buttons: {
          add: "Adicionar Conexão",
          edit: "Editar Conexão",
          delete: "Excluir Conexão",
          disconnect: "desconectar",
          tryAgain: "Tentar novamente",
          qrcode: "QR CODE",
          newQr: "Novo QR CODE",
          connecting: "Conectando",
        },
        toolTips: {
          disconnected: {
            title: "Falha ao iniciar sessão do WhatsApp",
            content:
              "Certifique-se de que seu celular esteja conectado à internet e tente novamente, ou solicite um novo QR Code",
          },
          qrcode: {
            title: "Esperando leitura do QR Code",
            content:
              "Clique no botão 'QR CODE' e leia o QR Code com o seu celular para iniciar a sessão",
          },
          connected: {
            title: "Conexão estabelecida!",
          },
          timeout: {
            title: "A conexão com o celular foi perdida",
            content:
              "Certifique-se de que seu celular esteja conectado à internet e o WhatsApp esteja aberto, ou clique no botão 'Desconectar' para obter um novo QR Code",
          },
        },
        table: {
          name: "Nome",
          status: "Status",
          lastUpdate: "Última atualização",
          default: "Padrão",
          actions: "Ações",
          session: "Sessão",
        },
      },
      whatsappModal: {
        title: {
          add: "Adicionar WhatsApp",
          edit: "Editar WhatsApp",
          delete: "Excluir WhatsApp",
        },
        form: {
          name: "Nome",
          default: "Padrão",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "WhatsApp salvo com sucesso.",
      },
      qrCode: {
        message: "Leia o QrCode para iniciar a sessão",
      },
      contacts: {
        title: "Contatos",
        toasts: {
          deleted: "Contato excluído com sucesso!",
        },
        searchPlaceholder: "Pesquisar...",
        confirmationModal: {
          deleteTitle: "Excluir ",
          importTitlte: "Importar contatos",
          deleteMessage:
            "Tem certeza que deseja excluir este contato? Todos os atendimentos relacionados serão perdidos.",
          importMessage: "Deseja importas todos os contatos do telefone?",
        },
        buttons: {
          import: "Importar Contatos",
          add: "Adicionar Contato",
        },
        table: {
          avatar: "Avatar",
          name: "Nome",
          whatsapp: "WhatsApp",
          email: "Email",
          actions: "Ações",
        },
      },
      forwardMessage: {
        text: "Encaminhada",
      },
      forwardMessageModal: {
        title: "Encaminhar mensagem",
        buttons: {
          ok: "Encaminhar",
        },
      },
      contactModal: {
        title: {
          add: "Adicionar contato",
          edit: "Editar contato",
          delete: "Excluir contato",
        },
        form: {
          mainInfo: "Dados do contato",
          extraInfo: "Informações adicionais",
          name: "Nome",
          number: "Número do Whatsapp",
          email: "Email",
          extraName: "Nome do campo",
          extraValue: "Valor",
        },
        buttons: {
          addExtraInfo: "Adicionar informação",
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Contato salvo com sucesso.",
      },
      queueModal: {
        title: {
          add: "Adicionar setor",
          edit: "Editar setor",
          delete: "Excluir setor",
        },
        form: {
          name: "Nome",
          color: "Cor",
          greetingMessage: "Mensagem de saudação",
          closingMessage: "Mensagem de finalização",
          absenceMessage: "Mensagem de ausência",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
      },
      userModal: {
        title: {
          add: "Adicionar usuário",
          edit: "Editar usuário",
          delete: "Excluir usuário",
        },
        form: {
          avatar: "Avatar",
          name: "Nome",
          email: "Email",
          password: "Senha",
          profile: "Perfil",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Usuário salvo com sucesso.",
      },
      answerModal: {
        title: {
          add: "Adicionar Resposta rápida",
          edit: "Editar Resposta rápida",
          delete: "Excluir Resposta rápida",
        },
        form: {
          shortcut: "Atalho",
          title: "Titulo",
          message: "Mensagem",
          password: "Senha",
          profile: "Perfil",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Resposta rápida salva com sucesso.",
      },
      chat: {
        noTicketMessage: "Selecione um atendimento para iniciar uma conversar.",
      },
      ticketsManager: {
        buttons: {
          newTicket: "Novo",
        },
      },
      ticketsQueueSelect: {
        placeholder: "Setores",
      },
      tickets: {
        toasts: {
          deleted: "O atendimento que você estava foi deletado.",
        },
        notification: {
          message: "Mensagem de",
        },
        tabs: {
          open: { title: "Atendimentos" },
          closed: { title: "Finalizados" },
          search: { title: "Busca" },
        },
        search: {
          placeholder: "Buscar atendimentos e mensagens",
        },
        buttons: {
          showAll: "Todos",
        },
      },
      transferTicketModal: {
        title: "Transferir Atendimento",
        fieldLabel: "Digite para buscar usuários",
        noOptions: "Nenhum usuário encontrado com esse nome",
        buttons: {
          ok: "Transferir",
          cancel: "Cancelar",
        },
      },
      ticketsList: {
        pendingHeader: "Aguardando",
        assignedHeader: "Atendendo",
        noTicketsTitle: "Nenhum atendimento!",
        noTicketsMessage:
          "Nenhum atendimento encontrado com esse status ou termo pesquisado",
        buttons: {
          accept: "Atender",
        },
      },
      newTicketModal: {
        title: "Criar Atendimento",
        fieldLabel: "Digite para pesquisar o contato",
        add: "Adicionar",
        buttons: {
          ok: "Salvar",
          cancel: "Cancelar",
        },
      },
      mainDrawer: {
        listItems: {
          dashboard: "Dashboard",
          connections: "Conexões",
          answers: "Respostas Rápidas",
          tickets: "Atendimentos",
          contacts: "Contatos",
          queues: "Setores",
          administration: "Administração",
          users: "Usuários",
          settings: "Configurações",
        },
        appBar: {
          config: {
            title: "WhaTicket",
            copyright: "Canove",
            pagecopyright: "https://github.com/canove",
          },
          user: {
            profile: "Perfil",
            logout: "Sair",
          },
        },
      },
      notifications: {
        noTickets: "Nenhuma notificação.",
      },
      queues: {
        title: "Setores",
        table: {
          name: "Nome",
          color: "Cor",
          greeting: "Mensagem de saudação",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar setor",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "Você tem certeza? Essa ação não pode ser revertida! Os atendimentos desse setor continuarão existindo, mas não terão mais nenhuma setor atribuído.",
        },
      },
      queueSelect: {
        inputLabel: "Setores",
      },
      users: {
        title: "Usuários",
        table: {
          avatar: "Avatar",
          name: "Nome",
          status: "Status",
          situation: "Situação",
          lastUpdate: "Última atualização",
          email: "Email",
          profile: "Perfil",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar usuário",
        },
        toasts: {
          deleted: "Usuário excluído com sucesso.",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "Todos os dados do usuário serão perdidos. Os atendimentos abertos deste usuário serão movidos para o setor.",
        },
      },
      answers: {
        title: "Respostas rápidas",
        table: {
          shortcut: "Atalho",
          title: "Titulo",
          message: "Mensagem",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar Resposta rápida",
          edit: "Editar Resposta rápida",
          delete: "Excluir Resposta rápida",
          actions: "Ações",
          ok: "Salvar",
          cancel: "Cancelar",
        },
        toasts: {
          add: "Resposta rápida adicionada com sucesso.",
          edit: "Resposta rápida atualizada com sucesso.",
          deleted: "Resposta rápida excluída com sucesso.",
          error:
            "Não foi possível conectar ao servidor, por favor tente novamente mais tarde",
        },
        confirmationModal: {
          deleteTitle: "Confirmar exclusão",
          deleteMessage:
            "Você tem certeza que deseja excluir? Essa ação não pode ser revertida!",
          yes: "Sim, excluir",
          no: "Não, Mantenha",
        },
        content: {
          shortcut: "Informe um atalho no minimo 8 caracteres",
          title: "Informe um titulo de até 150 caracteres",
          mensage: "Informe uma mensagem no máximo até 10.000 caracteres",
        },
      },
      settings: {
        success: "Configurações salvas com sucesso.",
        title: "Configurações",
        settings: {
          userCreation: {
            name: "Criação de usuário",
            options: {
              enabled: "Ativado",
              disabled: "Desativado",
            },
          },
        },
      },
      messagesList: {
        header: {
          assignedTo: "Atribuído à:",
          buttons: {
            return: "Retornar",
            resolve: "Finalizar",
            reopen: "Reabrir",
            accept: "Atender",
          },
        },
      },
      messagesInput: {
        placeholderOpen:
          "Digite uma mensagem ou tecle ''/'' para utilizar as respostas rápidas cadastrada",
        placeholderClosed:
          "Reabra ou clique em atender para enviar uma mensagem nesse atendimento.",
        placeholderInAttendance: "Este Atendimento já pertence a outro usuário",
        signMessage: "Assinar",
      },
      contactDrawer: {
        header: "Dados do contato",
        buttons: {
          edit: "Editar contato",
        },
        extraInfo: "Outras informações",
      },
      ticketOptionsMenu: {
        delete: "Excluir",
        transfer: "Transferir",
        confirmationModal: {
          title: "Excluir o atendimento do contato",
          message:
            "Atenção! Todas as mensagens relacionadas ao atendimento serão perdidas.",
        },
        buttons: {
          delete: "Excluir",
          cancel: "Cancelar",
        },
      },
      confirmationModal: {
        buttons: {
          confirm: "Ok",
          cancel: "Cancelar",
        },
      },
      messageOptionsMenu: {
        delete: "Excluir",
        reply: "Responder",
        forward: "Encaminhar",
        confirmationModal: {
          title: "Apagar mensagem?",
          message: "Esta ação não pode ser revertida.",
        },
      },
      attachments: {
        image: {
          icon: "image",
          content: "Mensagem de imagem",
        },
        audio: {
          icon: "ptt",
          content: "Mensagem de áudio",
        },
        video: {
          icon: "video",
          content: "Mensagem de vídeo",
        },
        file: {
          icon: "document",
          content: "Arquivo anexo",
        },
        sticker: {
          icon: "sticker",
          content: "Enviou uma figurinha",
        },
        location: {
          icon: "location",
          content: "Localização",
        },
        fallback: {
          icon: "link",
          content: "compartilhou uma URL",
        },
        vcard: {
          icon: "vcard",
          content: "Enviou um contato",
        },
        call: {
          icon: "call",
          content: "Chamada de Voz",
        },
      },
      Picker: {
        search: "Pesquisar",
        clear: "Limpar", // Etiqueta acessível no botão "limpar"
        notfound: "Nenhum Emoji Encontrado",
        skintext: "Escolha seu tom de pele padrão",
        categories: {
          search: "Resultados da pesquisa",
          recent: "Usado com frequência",
          smileys: "Smileys & Emotion",
          people: "Smileys & Pessoas",
          nature: "Animais & Natureza",
          foods: "Comidas & bebida",
          activity: "Atividades",
          places: "Viagem & lugares",
          objects: "Objetos",
          symbols: "Símbolos",
          flags: "Bandeiras",
          custom: "Personalizados",
        },
        categorieslabel: "Categorias de emoji", // Título acessível para a lista de categorias
        skintones: {
          1: "Tom de pele padrão",
          2: "Tom de pele claro",
          3: "Tom de pele médio-claro",
          4: "Tom de pele médio",
          5: "Tom de pele médio-escuro",
          6: "Tom de pele escuro",
        },
      },
      backendErrors: {
        ERR_NO_OTHER_WHATSAPP: "Deve haver pelo menos um WhatsApp padrão.",
        ERR_NO_DEF_WAPP_FOUND:
          "Nenhum WhatsApp padrão encontrado. Verifique a página de conexões.",
        ERR_WAPP_NOT_INITIALIZED:
          "Esta sessão do WhatsApp não foi inicializada. Verifique a página de conexões.",
        ERR_WAPP_CHECK_CONTACT:
          "Não foi possível verificar o contato do WhatsApp. Verifique a página de conexões",
        ERR_WAPP_INVALID_CONTACT: "Este não é um número de Whatsapp válido.",
        ERR_WAPP_DOWNLOAD_MEDIA:
          "Não foi possível baixar mídia do WhatsApp. Verifique a página de conexões.",
        ERR_INVALID_CREDENTIALS:
          "Erro de autenticação. Por favor, tente novamente.",
        ERR_SENDING_WAPP_MSG:
          "Erro ao enviar mensagem do WhatsApp. Verifique a página de conexões.",
        ERR_DELETE_WAPP_MSG: "Não foi possível excluir a mensagem do WhatsApp.",
        ERR_OTHER_OPEN_TICKET:
          "Já existe um atendimento aberto para este contato.",
        ERR_SESSION_EXPIRED: "Sessão expirada. Por favor entre.",
        ERR_USER_CREATION_DISABLED:
          "A criação do usuário foi desabilitada pelo administrador.",
        ERR_NO_PERMISSION: "Você não tem permissão para acessar este recurso.",
        ERR_DUPLICATED_CONTACT: "Já existe um contato com este número.",
        ERR_NO_SETTING_FOUND: "Nenhuma configuração encontrada com este ID.",
        ERR_NO_CONTACT_FOUND: "Nenhum contato encontrado com este ID.",
        ERR_NO_TICKET_FOUND: "Nenhum atendimento encontrado com este ID.",
        ERR_NO_USER_FOUND: "Nenhum usuário encontrado com este ID.",
        ERR_NO_WAPP_FOUND: "Nenhum WhatsApp encontrado com este ID.",
        ERR_CREATING_MESSAGE: "Erro ao criar mensagem no banco de dados.",
        ERR_CREATING_TICKET: "Erro ao criar tíquete no banco de dados.",
        ERR_FETCH_WAPP_MSG:
          "Erro ao buscar a mensagem no WhtasApp, talvez ela seja muito antiga.",
        ERR_QUEUE_COLOR_ALREADY_EXISTS:
          "Esta cor já está em uso, escolha outra.",
        ERR_WAPP_GREETING_REQUIRED:
          "A mensagem de saudação é obrigatório quando há mais de um setor.",
      },
    },
  },
};

export { messages };
