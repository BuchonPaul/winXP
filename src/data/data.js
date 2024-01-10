export const data = {
  nodes: [
    {
      id: "internet",
      type: "win-node",
      windowType: "internetWindow",
      description: "Votre desc",
      title: "Internet Explorer",
      icon: "internet.png",
      style: {
        text: {
          color: "white",
        },
      },
    },
    {
      id: "basket",
      type: "win-node",
      windowType: "Basket",
      description: "",
      title: "Corbeille",
      icon: "basket.png",
      style: {
        text: {
          color: "white",
        },
      },
    },
    {
      id: "node2",
      type: "win-node",
      windowType: "Word",
      description:
        "<p style='text-align: center'><span style='font-family: Comic Sans MS, Comic Sans; font-size: 28px'>Window XP<strong> </strong></span><span style='font-family: Comic Sans MS, Comic Sans; color: #0080ff; font-size: 28px'><strong>React</strong></span></p><p><span style='font-family: Arial; font-size: 12ptpx'>&nbsp;</span></p><p><span style='font-family: Arial; font-size: 12ptpx'>Bienvenue dans mon projet </span><span style='font-family: Arial; color: #e006f9; font-size: 20px'><strong>G6</strong></span><span style='font-family: Arial; font-size: 20px'><strong>/</strong></span><span style='font-family: Arial; color: #008073; font-size: 20px'><strong>Mini GPT</strong></span><span style='font-family: Arial; font-size: 12ptpx'>.</span></p><p><span style='font-family: Arial; font-size: 12ptpx'>Comme vous pouvez le constater, ce projet constitue une simulation simple de l'interface de Windows XP. Son fonctionnement repose sur un canva </span><span style='font-family: Arial; color: #e006f9; font-size: 12ptpx'><strong>G6 </strong></span><span style='font-family: Arial; font-size: 12ptpx'>qui émule un bureau. J'ai intégré certaines applications Windows de base à l'aide de composants React, choisies pour offrir un espace de travail ergonomique et fonctionnel :</span></p><ul><li><p><span style='font-family: Arial; font-size: 12ptpx'><em>Le Bloc-Notes permet d'écrire des notes simples sans mise en forme.</em></span></p></li><li><p><span style='font-family: Arial; font-size: 12ptpx'><em>La Corbeille permet de consulter les nœuds/applications supprimés et de les restaurer.</em></span></p></li><li><p><span style='font-family: Arial; font-size: 12ptpx'><em>Internet</em></span></p></li><li><p><span style='font-family: Arial; font-size: 12ptpx'><em>Word (bien sûr)</em></span></p></li></ul><p><span style='font-family: Arial; font-size: 12ptpx'>J'ai entrepris ce projet comme un défi technique dans le but de reproduire au mieux l'expérience d'utilisation de Windows, tout en exploitant les technologies web.</span></p><p><span style='font-family: Arial; font-size: 12ptpx'>Très tôt dans le processus, j'ai remarqué la difficulté d'utiliser les nœuds de </span><span style='font-family: Arial; color: #e105fa; font-size: 12ptpx'><strong>G6 </strong></span><span style='font-family: Arial; font-size: 12ptpx'>comme de simples nœuds avec du texte affiché dessus. C'est pourquoi j'ai opté pour l'utilisation des nœuds comme des raccourcis d'applications.</span></p><p><span style='font-family: Arial'>J’ai utilisé un contexte pour faciliter le passage des variables globales et des fonctions d’un composant à l’autre. Le contexte ne me semblait pas indispensable dans ce projet, mais il m’a facilité la tâche, notamment pour faire des tests.</span></p><p><span style='font-family: Arial; font-size: 12ptpx'>En ce qui concerne l'implémentation de l'</span><span style='font-family: Arial; color: #000000; font-size: 12ptpx'>IA </span><span style='font-family: Arial; font-size: 12ptpx'>dans le projet, j'ai eu l'idée de la présenter sous la forme d'un moteur de recherche. Cela m'a permis de travailler sur l'aspect serveur du projet. À chaque requête envoyée au serveur, j'ai créé quatre prompts pour générer quatre autres déclinaisons. La difficulté résidait dans la relative pauvreté du modèle de langage, entraînant parfois des boucles (la reformulation d'un prompt donnait un prompt identique).</span></p><p><span style='font-family: cursive; font-size: 12ptpx'>Ce projet pourrait être étendu en ajoutant d'autres applications, mais j'ai choisi de me limiter au strict nécessaire pour fournir un espace de travail 'complet'. Il m'a également permis de me familiariser avec React, m'offrant une progression significative dans la maîtrise de cette bibliothèque. J'ai cherché à utiliser le moins possible de bibliothèques afin de me familiariser avec les fonctionnalités de base de React.</span></p><p><span style='font-family: Arial'>&nbsp;</span></p><p><span style='font-family: Arial'>&nbsp;</span></p>",
      title: "Note d'intention",
      icon: "word.png",
      style: {
        text: {
          color: "white",
        },
      },
    },
    {
      id: "node1",
      type: "win-node",
      windowType: "NotePad",
      description: "",
      title: "Sticky Note",
      icon: "notepad.png",
      style: {
        text: {
          color: "white",
        },
      },
    },
  ],
  edges: [],
};
