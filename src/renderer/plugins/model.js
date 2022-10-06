const axios = require("axios").default;

var USER = 'alexis'
var HOST = 'localhost'
var PASS = 'Black1234@'
var DB = 'lekol_db'

class Model {

  knex = require("knex")( {
    client: "mysql2",
    connection: {
      host: HOST,
      port: 3306,
      user: USER,
      password: PASS,
      database: DB,
    },
  });

  constructor(){
    
    this.getData()

  }

  async getData() {

    var mysql

    var conn = this.knex

    await axios
      .get("http://localhost/lekol.php")
      .then(function (res) {

         var params =  res.data;

         mysql = {
          client: "mysql2",
          connection: {
            host: params.SERVER ?? HOST,
            port: 3306,
            user: params.USER ?? USER,
            password: params.PASSWORD ?? PASS,
            database: params.DBNAME ?? DB,
          },
        };

        conn = require("knex")(mysql);

      })
      .catch(function (error) {
        console.log(error);         

      });

      console.log(mysql);

      this.knex = conn
  }
  
  // AUTHENTIFICATION ===========================================================

  async auth(Login, Password) {
    let rep;
    await this.knex
      .select("*")
      .from("agent")
      .where({
        LoginAgent: Login,
        PasswordAgent: Password,
        PasswordAgent: Password,
      })
      .first()
      .then(function (row) {
        rep = row;
      });

    if (!rep) {
      return false;
    } else {
      return rep;
    }
  }

  //  ANNEE SCOLAIRE  ===========================================================

  async allAnnee() {
    let rep;
    await this.knex
      .select("*")
      .from("annee_scolaire")
      .then(function (row) {
        rep = row;
      });

    if (!rep) {
      return [];
    } else {
      return rep;
    }
  }

  // ECOLE INFO ===========================================================

  async getEtabInfo() {
    let rep;
    await this.knex
      .select("*")
      .from("etablissement")
      .first()
      .then((row) => {
        console.log(row);
        rep = row;
      });

    return rep;
  }

  // AGENT DATA INFO ======================================================

  async getAgent() {
    let rep;
    await this.knex
      .select("*")
      .from("agent")
      .join("grade", function () {
        this.on("grade.IDGRADE", "=", "agent.IDGRADE");
      })
      .join("agent_annee", function () {
        this.on("agent_annee.CodeAgent", "=", "agent.CodeAgent");
      })
      .then((row) => {
        console.log(row);
        rep = row;
      });

    if (rep.length == 0) {
      return false;
    } else {
      return rep;
    }
  }

  // GET CLASSE GENERALE ===========================================================

  async getClasseGenerale(examen = false) {
    let rep;

    if (examen) {
      await this.knex
        .select("*")
        .from("classe_generale")
        .where({ bExamen: 1 })
        .then((row) => {
          console.log(row);
          rep = row;
        });
    } else {
      await this.knex
        .select("*")
        .from("classe_generale")
        .then((row) => {
          console.log(row);
          rep = row;
        });
    }

    return rep;
  }

  // UPDATE CYCLE ===========================================================

  async updateCycle(cycle, etablissement) {
    let exec = await this.knex("etablissement")
      .update({
        bPreScolaire: cycle.prescolaire,
        bPrimaire: cycle.primaire,
        bCollege: cycle.college,
        bLycee: cycle.lycee,
      })
      .where("IDETAB", etablissement.IDETAB);

    if (exec) {
      return "Succes! Operation reussie";
    } else {
      return "Echec! Operation non reussie";
    }
  }

  // CREATE CLASSE GENERALE ===========================================================

  async createClasseGenerale(classe) {
    let exec = await this.knex("classe_generale").insert({
      CodeClasse: classe.code,
      NomClasse: classe.nom,
      bExamen: classe.bExamen,
      IDCYCLE: classe.IDCYCLE,
    });

    return exec;
  }

  // CREATE AGENT ====================================================================

  async createAgent(agent) {
    let exec = await this.knex("agent").insert({
      bHomme: agent.bHomme,
      NomAgent: agent.NomAgent,
      CodeAgent: agent.CodeAgent,
      PrenomAgent: agent.PrenomAgent,
      DateNaissance: agent.DateNaissance,
      LieuNaissance: agent.LieuNaissance,
      MobileAgent: agent.MobileAgent,
      AdresseAgent: agent.AdresseAgent,
      LoginAgent: agent.LoginAgent,
      PasswordAgent: agent.PasswordAgent,
      IDGRADE: agent.IDGRADE,
      Photo: agent.Photo,
    });

    await this.knex("agent_annee").insert({
      CodeAgent: agent.CodeAgent,
      Annee: agent.Annee ?? 0,
      bEtat: 1,
    });

    if (agent.update.newNum > 1) {
      let update = await this.knex("matriculation")
        .update({
          numero: agent.update.newNum,
        })
        .where("Annee", agent.update.Annee)
        .andWhere("bType", 2);
    } else {
      let insert = await this.knex("matriculation").insert({
        numero: agent.update.newNum,
        Annee: agent.update.Annee,
        bType: 2,
      });
    }

    return exec;
  }

  // CREATE ENSEIGNANT =============================================================

  async createEnseignant(enseignant) {
    let exec = await this.knex("enseignant").insert({
      bHomme: enseignant.bHomme,
      NomEnseignant: enseignant.NomEnseignant,
      CodeEnseignant: enseignant.CodeEnseignant,
      PrenomEnseignant: enseignant.PrenomEnseignant,
      DateNaissance: enseignant.DateNaissance,
      LieuNaissance: enseignant.LieuNaissance,
      MobileEnseignant: enseignant.MobileEnseignant,
      AdresseEnseignant: enseignant.AdresseEnseignant,
      LoginEnseignant: enseignant.LoginEnseignant,
      PasswordEnseignant: enseignant.PasswordEnseignant,
      IDMATIERE_GEN: enseignant.IDMATIERE_GEN,
      IDCLASSE: enseignant.IDCLASSE,
      Photo: enseignant.Photo,
    });

    let annee = await this.knex("enseignant_annee").insert({
      CodeEnseignant: enseignant.CodeEnseignant,
      Annee: enseignant.Annee ?? 0,
      bEtat: 1,
    });

    if (enseignant.update.newNum > 1) {
      let update = await this.knex("matriculation")
        .update({
          numero: enseignant.update.newNum,
        })
        .where("Annee", enseignant.update.Annee)
        .where("bType", 3);
    } else {
      let insert = await this.knex("matriculation").insert({
        numero: enseignant.update.newNum,
        Annee: enseignant.update.Annee,
        bType: 3,
      });
    }

    return exec;
  }

  // CREATE GRADE ==============================================================

  async createGrade(grade) {
    let exec = await this.knex("grade").insert({
      CodeGrade: grade.CodeGrade,
      NomGrade: grade.NomGrade,
    });

    return exec;
  }

  // CREATE CLASSE GENERALE ==================================================================

  async createClasseIntermediaire(classe) {
    let rep;
    let exec = await this.knex("classe")
      .insert({
        IDCLASSE_GEN: classe.IDCLASSE_GEN,
        CodeClasseIntermediaire: classe.CodeClasse,
        Annee: classe.Annee,
      })
      .catch(function (error) {
        console.error(error);
        exec = error;
      });

    return exec;
  }

  // CREATE MATIERE PAR CLASSE =============================================================

  async createMatiereClasse(matiere) {
    let exec = await this.knex("matiere_classe")
      .insert({
        IDCLASSE_GEN: matiere.IDCLASSE_GEN,
        IDMATIERE_GEN: matiere.IDMATIERE_GEN,
        Appelation: matiere.Appelation,
        Coefficient: matiere.Coefficient,
        MoyenneMin: matiere.MoyenneMin,
        MoyenneMax: matiere.MoyenneMax,
        Annee: matiere.Annee,
      })
      .catch(function (error) {
        console.error(error);
        exec = error;
      });

    return exec;
  }

  // CREATE MATIERE GENERALE ===========================================================

  async createMatiereGenerale(matiere) {
    let exec = await this.knex("matiere_generale")
      .insert({
        CodeMatiere: matiere.code,
        NomMatiere: matiere.nom,
        bPrescolaire: matiere.bPrescolaire,
        bPrimaire: matiere.bPrimaire,
        bCollege: matiere.bCollege,
        bLycee: matiere.bLycee,
      })
      .catch(function (error) {
        console.error(error);
        exec = error;
      });

    return exec;
  }

  // GET MATIERE GENERALE ===========================================================

  async getMatiereGenerale() {
    let rep;
    await this.knex
      .select("*")
      .from("matiere_generale")
      .then((row) => {
        console.log(row);
        rep = row;
      });

    return rep;
  }

  // GET ENSEIGNANT ===========================================================

  async getEnseignant(Annee) {
    let rep;
    await this.knex
      .select("*")
      .from("enseignant")
      .join("enseignant_annee", function () {
        this.on(
          "enseignant_annee.CodeEnseignant",
          "=",
          "enseignant.CodeEnseignant"
        );
      })
      .where("enseignant_annee.Annee", Annee)
      .then((row) => {
        console.log(row);
        rep = row;
      });

    return rep;
  }

  // GET AGENT ===========================================================

  async getAgent(Annee) {
    let rep;
    let sql =
      "select * from agent inner join agent_annee on agent_annee.CodeAgent = agent.CodeAgent where agent_annee.Annee = " +
      Annee;
    await this.knex.raw(sql).then((row) => {
      console.log(row);
      rep = row;
    });

    return rep;
  }

  // GET GRADE ===========================================================

  async getGrade() {
    let rep;
    await this.knex
      .select("*")
      .from("grade")
      .then((row) => {
        console.log(row);
        rep = row;
      });

    return rep;
  }

  // GET MATIERE PAR CLASSE ===========================================================

  async getMatiereClasse(Annee = 0, IDCLASSE_GEN = 0) {
    let rep;

    let sql =
      `select * from matiere_classe 
    join matiere_generale on matiere_generale.IDMATIERE_GEN = matiere_classe.IDMATIERE_GEN
    where matiere_classe.Annee = ` + Annee;

    if (IDCLASSE_GEN && IDCLASSE_GEN != 0) {
      sql += ` and matiere_classe.IDMATIERE_GEN = ` + IDCLASSE_GEN;
    }

    await this.knex.raw(sql).then((row) => {
      console.log(row);
      rep = row;
    });

    return rep;
  }

  // GET CLASSE INTERMEDIAIRE ===========================================================

  async getClasseIntermediaire(filtre) {
    let rep;

    let sql = `select * from classe join classe_generale on classe_generale.IDCLASSE_GEN = classe.IDCLASSE_GEN
   where 1 `;

    if (filtre.cycle != 0) {
      sql += ` and classe_generale.IDCYCLE = ` + filtre.cycle;
    }

    if (filtre.Annee != 0) {
      sql += ` and classe.Annee =  ` + filtre.Annee;
    }

    if (filtre.IDCLASSE != 0) {
      sql += ` and classe.IDCLASSE =  ` + filtre.IDCLASSE;
    }

    if (filtre.IDCLASSE_GEN && filtre.IDCLASSE_GEN != 0) {
      sql += `  and classe_generale.IDCLASSE_GEN = ` + filtre.IDCLASSE_GEN;
    }

    if (filtre.IDCLASSE != 0) {
      sql += ` LIMIT 1  `;
    }

    await this.knex.raw(sql).then((row) => {
      console.log(row);
      rep = row;
    });

    return rep;
  }

  // GET MATRICULATION ===========================================================

  async getMatricule(Annee = 0, bType = 0) {
    let rep;
    await this.knex
      .select("numero")
      .from("matriculation")
      .where("Annee", Annee)
      .andWhere("bType", bType)
      .then((row) => {
        console.log(row);
        rep = row;
      });
    if (rep.length != 0) {
      return rep[rep.length - 1].numero;
    } else {
      return 0;
    }
  }

  // CREATE ELEVE ===========================================================

  async createEleve(eleve) {
    let exec = await this.knex("eleve").insert({
      bHomme: eleve.bHomme,
      bNouveau: eleve.bNouveau,
      bInscription: eleve.bInscription,
      bEPS: eleve.bEPS,
      NomEleve: eleve.NomEleve,
      PrenomEleve: eleve.PrenomEleve,
      DateNaissance: eleve.DateNaissance,
      LieuNaissance: eleve.LieuNaissance,
      IDCLASSE: eleve.IDCLASSE,
      Photo: eleve.Photo,
      NomPere: eleve.NomPere,
      NomMere: eleve.NomMere,
      NomTuteur: eleve.NomTuteur,
      MobileEleve: eleve.MobileEleve,
      MobilePere: eleve.MobilePere,
      MobileMere: eleve.MobileMere,
      MobileTuteur: eleve.MobileTuteur,
      CodeEleve: eleve.CodeEleve,
      Annee: eleve.Annee ?? 0,
    });

    if (exec) {
      let eleve_annee = await this.knex("eleve_annee").insert({
        bNouveau: eleve.bNouveau,
        bInscription: eleve.bInscription,
        CodeEleve: eleve.CodeEleve,
        IDCLASSE: eleve.IDCLASSE,
        Annee: eleve.Annee ?? 0,
        bEtat: 1,
      });
      if (eleve.update.action == "U") {
        let update = await this.knex("matriculation")
          .update({
            numero: eleve.update.newNum,
          })
          .where("Annee", eleve.update.Annee)
          .andWhere("bType", 1);

        if (update) {
          return "Succes! Operation reussie";
        } else {
          return "Echec! Operation non reussie";
        }
      } else if (eleve.update.action == "I") {
        let insert = await this.knex("matriculation").insert({
          numero: eleve.update.newNum,
          Annee: eleve.update.Annee,
          bType: 1,
        });

        return insert;
      }
    } else {
      return "Insertion echoue";
    }
  }

  // GET MATRICULATION ===========================================================

  async allEleve(filtre) {
    let rep;
    let filtering = {};

    if (filtre.IDCLASSE) {
      filtering = {
        ...filtering,
        IDCLASSE: filtre.IDCLASSE,
        Annee: filtre.Annee,
      };
    }
    if (filtre.genre) {
      filtering = {
        ...filtering,
        bHomme: filtre.genre,
        Annee: filtre.Annee,
      };
    }

    let sql = `select * from eleve 
    join eleve_annee on eleve_annee.CodeEleve = eleve.CodeEleve 
    join classe on classe.IDCLASSE = eleve_annee.IDCLASSE
    join classe_generale on classe_generale.IDCLASSE_GEN = classe.IDCLASSE_GEN
    where 1  `;

    if (filtre.genre != "") {
      sql += " and eleve.bHomme = " + filtre.genre;
    }
    if (filtre.IDCLASSE != "") {
      sql += " and eleve_annee.IDCLASSE = " + filtre.IDCLASSE;
    }

    if (filtre.IDCLASSE_GEN != "") {
      sql += " and classe_generale.IDCLASSE_GEN = " + filtre.IDCLASSE_GEN;
    }

    if (filtre.bExamen != "") {
      sql += " and classe_generale.bExamen = " + filtre.bExamen;
    }

    if (filtre.bEtat != "") {
      sql += " and eleve_annee.bEtat = " + filtre.bEtat;
    }

    if (filtre.Annee != "") {
      sql += " and eleve_annee.Annee = " + filtre.Annee;
    }

    await this.knex.raw(sql).then((row) => {
      console.log(row);
      rep = row;
    });

    return rep;
  }

  // DELETE ELEVE ===========================================================

  async deleteEleve(CodeEleve, Annee, bEtat = 0) {
    let exec = await this.knex("eleve_annee")
      .update({
        bEtat: bEtat,
      })
      .where("eleve_annee.CodeEleve", CodeEleve)
      .andWhere("eleve_annee.Annee", Annee);

    if (exec) {
      return "Succes! Operation reussie";
    } else {
      return "Echec! Operation non reussie";
    }
  }

  // UPDATE ELEVE ===========================================================

  async updateEleve(eleve) {
    let exec = await this.knex("eleve")
      .update({
        bHomme: eleve.bHomme,
        bEPS: eleve.bEPS,
        NomEleve: eleve.NomEleve,
        PrenomEleve: eleve.PrenomEleve,
        DateNaissance: eleve.DateNaissance,
        LieuNaissance: eleve.LieuNaissance,
        Photo: eleve.Photo.length == 0 ? eleve.PHOTO : eleve.Photo,
        NomPere: eleve.NomPere,
        NomMere: eleve.NomMere,
        NomTuteur: eleve.NomTuteur,
        MobileEleve: eleve.MobileEleve,
        MobilePere: eleve.MobilePere,
        MobileMere: eleve.MobileMere,
        MobileTuteur: eleve.MobileTuteur,
      })
      .where("CodeEleve", eleve.CodeEleve)
      .andWhere("Annee", eleve.Annee);

    let update_year = await this.knex("eleve_annee")
      .update({
        IDCLASSE: eleve.IDCLASSE,
        bNouveau: eleve.bNouveau,
        bInscription: eleve.bInscription,
      })
      .where("CodeEleve", eleve.CodeEleve)
      .andWhere("Annee", eleve.Annee);

    if (exec && update_year) {
      return "Succes! Operation reussie";
    } else {
      return "Echec! Operation non reussie";
    }
  }

  // DEVOIR ===========================================================

  async checkNote(CodeEleve, Trimestre, Annee, IDMATIERE) {
    let result;
    await this.knex
      .raw(
        `select * from note where CodeEleve = '` +
          CodeEleve +
          `' and Trimestre = '` +
          Trimestre +
          `'  and Annee = '` +
          Annee +
          `'  and IDMATIERE = '` +
          IDMATIERE +
          `'`
      )
      .then((res) => {
        console.log(res.length);
        result = res;
      });

    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async getOnlyNote(filtre) {
    let result;
    let sql = `select eleve.IDELEVE, 
    eleve.NomEleve, 
    eleve.PrenomEleve , 
    eleve.CodeEleve, 
    eleve_annee.IDCLASSE ,
    eleve_annee.Annee,
    note.IDNOTE,
    note.IDMATIERE,
    note.Trimestre,
    note.DV1,
    note.DV2,
    note.DD,
    note.MCL,
    note.MCOMP,
    note.MGLE ,
    matiere_classe.Coefficient,
    note.Appreciation,
    note.bjustifiee from eleve 
    join note on note.CodeEleve = eleve.CodeEleve 
    join eleve_annee on eleve_annee.CodeEleve = eleve.CodeEleve
    join matiere_classe on matiere_classe.IDMATIERE_CLASSE = note.IDMATIERE
    where 1 `;

    if (filtre.Annee != 0) {
      sql += ` and eleve_annee.Annee = ` + filtre.Annee;
    }

    if (filtre.IDCLASSE) {
      sql += ` and eleve_annee.IDCLASSE = ` + filtre.IDCLASSE;
    }

    if (filtre.IDMATIERE) {
      sql += ` and note.IDMATIERE = ` + filtre.IDMATIERE;
    }

    if (filtre.Trimestre) {
      sql += ` and note.Trimestre = ` + filtre.Trimestre;
    }

    sql += ` order by eleve.NomEleve ASC`;

    await this.knex.raw(sql).then(async (row) => {
      result = row;
    });

    return {
      len: result.length,
      data: result,
    };
  }

  async getEleveNote(filtre) {
    // recup tous les eleves

    let eleve =
      `select eleve.IDELEVE, 
     eleve.NomEleve, 
     eleve.PrenomEleve , 
     eleve.CodeEleve, 
     eleve_annee.IDCLASSE ,
     eleve_annee.Annee from eleve 
     join eleve_annee on eleve_annee.CodeEleve = eleve.CodeEleve
     where eleve_annee.IDCLASSE ='` +
      filtre.IDCLASSE +
      `' and eleve_annee.Annee ='` +
      filtre.Annee +
      `'`;

    await this.knex.raw(eleve).then(async (data) => {
      console.log(data.length);

      var allNote = await this.getOnlyNote(filtre);

      console.log(allNote.len);

      if (allNote.len != data.length) {
        if (data.length > 0) {
          console.log("data being loop");
          data.map(async (el) => {
            let exist = await this.checkNote(
              el.CodeEleve,
              filtre.Trimestre,
              filtre.Annee,
              filtre.IDMATIERE
            );
            console.log("eleve exist :" + exist);

            if (!exist) {
              console.log("creating not existing eleve");
              await this.addNote({
                CodeEleve: el.CodeEleve,
                Annee: filtre.Annee,
                IDMATIERE: filtre.IDMATIERE,
                Trimestre: filtre.Trimestre,
                DV1: 0,
                DV2: 0,
                DD: 0,
                MCL: 0,
                MCOMP: 0,
                MGLE: 0,
                Appreciation: "Faible",
                bjustifiee: 1,
              });
            }
          });
        }
      }
    });

    var allNote = await this.getOnlyNote(filtre);
    return allNote.data;
  }

  async addNote(note) {
    let sql, rep;
    sql =
      `insert into note
     (CodeEleve , Annee , IDMATIERE , Trimestre , DV1 , DV2 ,  DD , MCL, MCOMP, MGLE , Appreciation, bjustifiee)
     values ('` +
      note.CodeEleve +
      `' ,'` +
      note.Annee +
      `' , '` +
      note.IDMATIERE +
      `' , '` +
      note.Trimestre +
      `' ,
     '` +
      note.DV1 +
      `' , '` +
      note.DV2 +
      `' , '` +
      note.DD +
      `' , '` +
      note.MCL +
      `' , '` +
      note.MCOMP +
      `', '` +
      note.MGLE +
      `' , 
     '` +
      note.Appreciation +
      `', '` +
      note.bjustifiee +
      `' ) `;

    await this.knex.raw(sql).then((res) => {
      console.log(res);
    });
  }

  async updateNote(note) {
    let sql, rep;
    sql = `update note SET CodeEleve = '` + note.CodeEleve + `' `;

    if (note.DV1) {
      sql += ` , DV1 ='` + note.DV1 + `' `;
    }

    if (note.DV2) {
      sql += ` , DV2 ='` + note.DV2 + `' `;
    }

    if (note.DD) {
      sql += ` , DD ='` + note.DD + `' `;
    }

    if (note.MCL) {
      sql += ` , MCL ='` + note.MCL + `' `;
    }

    if (note.MCOMP) {
      sql += ` , MCOMP ='` + note.MCOMP + `' `;
    }

    if (note.MGLE) {
      sql += ` , MGLE ='` + note.MGLE + `' `;
    }

    if (note.Appreciation) {
      sql += ` , Appreciation ='` + note.Appreciation + `' `;
    }

    if (note.bjustifiee) {
      sql += ` , bjustifiee ='` + note.bjustifiee + `' `;
    }

    sql +=
      ` where CodeEleve = '` +
      note.CodeEleve +
      `' 
    and IDMATIERE =  '` +
      note.IDMATIERE +
      `' 
    and Trimestre =  '` +
      note.Trimestre +
      `' 
    and  Annee = '` +
      note.Annee +
      `' `;

    await this.knex.raw(sql).then((res) => {
      console.log(res);
    });

    console.log(sql);
  }

  /// classement des eleves

  async getClassementEleve(filtre) {
    let result = [],
      filteredData = [],
      sql = `select eleve.IDELEVE, 
    eleve.NomEleve, 
    eleve.PrenomEleve , 
    eleve.CodeEleve, 
    eleve_annee.IDCLASSE ,
    eleve_annee.Annee,
        note.IDMATIERE,
        note.Trimestre,
        note.MGLE ,
        matiere_classe.Coefficient
     from eleve 
         join note on note.CodeEleve = eleve.CodeEleve 
        join eleve_annee on eleve_annee.CodeEleve = eleve.CodeEleve
        join matiere_classe on matiere_classe.IDMATIERE_CLASSE = note.IDMATIERE
        where 1 `;

    if (filtre.Annee) {
      sql += ` and note.Annee = '` + filtre.Annee + `'`;
    }

    if (filtre.IDCLASSE) {
      sql += ` and eleve_annee.IDCLASSE = '` + filtre.IDCLASSE + `'`;
    }

    if (filtre.Annee) {
      sql += ` and note.Trimestre = '` + filtre.Trimestre + `'`;
    }

    sql += ` order by eleve.NomEleve asc`;

    console.log(sql);

    await this.knex.raw(sql).then((row) => {
      result = row;
    });

    if (result.length != 0) {
      var temp = null;
      var moy = 0,
        Coef = 0;
      result.map((el) => {
        if (temp == null) {
          temp = el;
        }

        if (temp.CodeEleve == el.CodeEleve) {
          moy += parseFloat(el.MGLE);
          Coef += parseFloat(el.Coefficient);
        } else {
          filteredData[result.indexOf(temp)] = {
            ...el,
            MOY: moy / Coef,
          };
        }
        temp = el;
      });

      // processing data

      filteredData.map(async (row) => {
        let sql_classement =
          `select * from classement_eleve where IDCLASSE = '` +
          row.IDCLASSE +
          `' 
          and Trimestre = '` +
          row.Trimestre +
          `' and Annee = '` +
          row.Annee +
          `' and CodeEleve = '` +
          row.CodeEleve +
          `'`;
        await this.knex.raw(sql_classement).then(async (res) => {
          if (res.length == 0) {
            await this.knex("classement_eleve").insert({
              CodeEleve: row.CodeEleve,
              NomEleve: row.NomEleve,
              PrenomEleve: row.PrenomEleve,
              Moyenne: row.MOY,
              Rang: "",
              Appreciation: "",
              Annee: row.Annee,
              IDCLASSE: row.IDCLASSE,
              Trimestre: row.Trimestre,
              status: parseFloat(row.MOY) < 10 ? "Echoue(e)" : "Admis(e)",
            });
          }
        });
      });

      let classement_data = await this.onlyClassement(filtre);
      classement_data.map(async (el) => {
        await this.knex("classement_eleve")
          .update({
            Rang:
              classement_data.indexOf(el) + 1 == 1
                ? classement_data.indexOf(el) + 1 + "er(e)"
                : classement_data.indexOf(el) + 1 + "eme",
            Appreciation: el.Appreciation,
          })
          .where({
            CodeEleve: el.CodeEleve,
            Annee: el.Annee,
            IDCLASSE: el.IDCLASSE,
            Trimestre: el.Trimestre,
          });
      });

      classement_data = await this.onlyClassement(filtre);

      return classement_data;
    }

    return [];
  }

  async onlyClassement(filtre) {
    let classement = [];
    let sql_classement =
      `select *, (
        case 
        when Moyenne < 8 then 'Insuffisant'
        when Moyenne >= 8 and  Moyenne < 10  then 'Faible'
        when Moyenne >= 10 and  Moyenne < 12  then 'Passable'
        when Moyenne >= 12 and  Moyenne < 14  then 'Assez-Bien'
        when Moyenne >= 14 and  Moyenne < 16  then 'Bien'
        when Moyenne >= 16 and  Moyenne < 18  then 'Tres-Bien'
        when Moyenne >= 18 and  Moyenne < 21  then 'Excellent'
        end
       ) as Appreciation from classement_eleve where IDCLASSE = '` +
      filtre.IDCLASSE +
      `' 
       and Trimestre = '` +
      filtre.Trimestre +
      `' and Annee = '` +
      filtre.Annee +
      `' order by Moyenne desc`;
    await this.knex.raw(sql_classement).then((data) => {
      classement = data;
    });

    return classement;
  }

  // ======================= STATS ==========================

  async eleveInscris(Annee) {
    let stat = {};
    await this.knex
      .raw(
        `select distinct 
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve where eleve_annee.Annee = '` +
          Annee +
          `' 
    and eleve_annee.bInscription = 1)  as Total ,
    
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve where eleve_annee.Annee = '` +
          Annee +
          `'  
    and eleve_annee.bInscription = 1 and eleve.bHomme = 1)  as Homme, 
    
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve where eleve_annee.Annee = '` +
          Annee +
          `'  
    and eleve_annee.bInscription = 1 and eleve.bHomme <> 1)  as Femme 
    
    from eleve_annee`
      )
      .then((row) => {
        stat = row[0];
      });

    console.log(stat);
    return stat;
  }

  async eleveReInscris(Annee) {
    let stat = {};
    await this.knex
      .raw(
        `select distinct 
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve where eleve_annee.Annee = '` +
          Annee +
          `' 
    and eleve_annee.bInscription <> 1)  as Total ,
    
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve where eleve_annee.Annee = '` +
          Annee +
          `'  
    and eleve_annee.bInscription <> 1 and eleve.bHomme = 1)  as Homme, 
    
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve where eleve_annee.Annee = '` +
          Annee +
          `'  
    and eleve_annee.bInscription <> 1 and eleve.bHomme <> 1)  as Femme 
    
    from eleve_annee`
      )
      .then((row) => {
        stat = row[0];
      });

    console.log(stat);
    return stat;
  }

  async eleveExamens(Annee) {
    let stat = {};
    await this.knex
      .raw(
        `select distinct 
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve 
    join classe on classe.IDCLASSE = eleve_annee.IDCLASSE
     join classe_generale on classe_generale.IDCLASSE_GEN = classe.IDCLASSE_GEN
     where eleve_annee.Annee = '` +
          Annee +
          `' and eleve_annee.bInscription = 1 and classe_generale.bExamen = 1 )  as Total ,
    
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve 
     join classe on classe.IDCLASSE = eleve_annee.IDCLASSE
     join classe_generale on classe_generale.IDCLASSE_GEN = classe.IDCLASSE_GEN
     where eleve_annee.Annee = '` +
          Annee +
          `' and eleve_annee.bInscription = 1 
     and classe_generale.bExamen = 1 and eleve.bHomme = '1')  as Homme, 
    
    ( select count(*) Total from eleve_annee
    join eleve on eleve.CodeEleve = eleve_annee.CodeEleve 
     join classe on classe.IDCLASSE = eleve_annee.IDCLASSE
     join classe_generale on classe_generale.IDCLASSE_GEN = classe.IDCLASSE_GEN
     where eleve_annee.Annee = '` +
          Annee +
          `' and eleve_annee.bInscription = 1 and classe_generale.bExamen = 1
     and eleve.bHomme <> '1')  as Femme 
    
    from eleve_annee`
      )
      .then((row) => {
        stat = row[0];
      });

    console.log(stat);
    return stat;
  }

  async agentStat(Annee) {
    let stat = {};
    await this.knex
      .raw(
        `select distinct 
    ( select count(*) Total from agent_annee
     where agent_annee.Annee = '` +
          Annee +
          `' and bEtat = 1  )  as Total ,
    
    ( select count(*) Total from agent_annee
     join agent on agent.CodeAgent = agent_annee.CodeAgent
     where agent_annee.Annee = '` +
          Annee +
          `' and agent_annee.bEtat = 1 and agent.bHomme = '1')  as Homme, 
    
    (select count(*) Total from agent_annee
     join agent on agent.CodeAgent = agent_annee.CodeAgent
     where agent_annee.Annee = '` +
          Annee +
          `' and agent_annee.bEtat = 1 and agent.bHomme  <> '1')  as Femme 
    
    from agent_annee`
      )
      .then((row) => {
        stat = row[0];
      });

    console.log(stat);
    return stat;
  }

  async enseignantStat(Annee) {
    let stat = {};
    await this.knex
      .raw(
        `select distinct 
    ( select count(*) Total from enseignant_annee
     where enseignant_annee.Annee = '` +
          Annee +
          `' and bEtat = 1  )  as Total ,
    
    ( select count(*) Total from enseignant_annee
     join enseignant on enseignant.CodeEnseignant = enseignant_annee.CodeEnseignant
     where enseignant_annee.Annee = '` +
          Annee +
          `' and enseignant_annee.bEtat = 1 and enseignant.bHomme = '1')  as Homme, 
    
    (select count(*) Total from enseignant_annee
     join enseignant on enseignant.CodeEnseignant = enseignant_annee.CodeEnseignant
     where enseignant_annee.Annee = '` +
          Annee +
          `' and enseignant_annee.bEtat = 1 and enseignant.bHomme  <> '1')  as Femme 
    
    from enseignant_annee`
      )
      .then((row) => {
        stat = row[0];
      });

    console.log(stat);
    return stat;
  }

  // UPDATE AGENT ====================================================================

  async updateAgent(agent) {
    let exec = await this.knex("agent")
      .update({
        bHomme: agent.bHomme,
        NomAgent: agent.NomAgent,
        PrenomAgent: agent.PrenomAgent,
        DateNaissance: agent.DateNaissance,
        LieuNaissance: agent.LieuNaissance,
        MobileAgent: agent.MobileAgent,
        AdresseAgent: agent.AdresseAgent,
        PasswordAgent: agent.PasswordAgent,
        IDGRADE: agent.IDGRADE,
        Photo: agent.Photo.length > 0 ? agent.Photo : agent.PHOTO,
      })
      .where({
        CodeAgent: agent.CodeAgent,
      });

    return exec;
  }

  // UPDATE ENSEIGNANT ====================================================================

  async updateEnseignant(Enseignant) {
    let exec = await this.knex("enseignant")
      .update({
        bHomme: Enseignant.bHomme,
        NomEnseignant: Enseignant.NomEnseignant,
        PrenomEnseignant: Enseignant.PrenomEnseignant,
        DateNaissance: Enseignant.DateNaissance,
        LieuNaissance: Enseignant.LieuNaissance,
        MobileEnseignant: Enseignant.MobileEnseignant,
        AdresseEnseignant: Enseignant.AdresseEnseignant,
        PasswordEnseignant: Enseignant.PasswordEnseignant,
        IDMATIERE_GEN: Enseignant.IDMATIERE_GEN,
        IDCLASSE: Enseignant.IDCLASSE,
        Photo:
          Enseignant.Photo.length > 0 ? Enseignant.Photo : Enseignant.PHOTO,
      })
      .where({
        CodeEnseignant: Enseignant.CodeEnseignant,
      });

    return exec;
  }

  // CREATE FRAIS GENERAUX ====================================================================

  async createFraisGeneral(Frais) {
    let exec = await this.knex("frais_generaux").insert({
      NomFrais: Frais.NomFrais,
      CodeFrais: Frais.CodeFrais,
      Echeance: Frais.Echeance,
      bOccasionnel: Frais.bOccasionnel,
      Annee: Frais.Annee,
    });

    return exec;
  }

  // GET FRAIS GENERAUX ====================================================================

  async getFraisGeneraux(Annee) {
    let data;
    await this.knex
      .select("*")
      .from("frais_generaux")
      .where({ Annee: Annee })
      .then((res) => (data = res));

    return data;
  }

  // UPDATE ETABLISSEMENT ==================================================================

  async updateEtablissement(ecole) {
    let exec = await this.knex("etablissement")
      .update({
        NomEtab: ecole.NomEtab,
        Responsable: ecole.Responsable,
        Mobile: ecole.Mobile,
        Ville: ecole.Ville,
        Pays: ecole.Pays,
        Adresse: ecole.Adresse,
        Logo: ecole.Logo,
        bFermer: ecole.bFermer,
      })
      .where("IDETAB", ecole.IDETAB);

    return exec;
  }

  // CLOTURE ANNEE - ETABLISSEMENT ==================================================================

  async clotureEtablissement(annee, bCloture) {
    let exec = await this.knex("annee_scolaire")
      .update({
        bCloture: bCloture,
      })
      .where("debut", annee);

    return exec;
  }

  //  ANNEE - SCOLAIRE ETABLISSEMENT ==================================================================

  async anneeScolaire(annee) {
    let exec;
    await this.knex
      .select("*")
      .from("annee_scolaire")
      .where({
        debut: annee,
      })
      .first()
      .then((res) => {
        exec = res;
      });

    return exec;
  }

  //  ALL ANNEE - SCOLAIRE ETABLISSEMENT ==========================

  async allAnneeScolaire() {
    let exec;
    await this.knex
      .select("*")
      .from("annee_scolaire")
      .then((res) => {
        exec = res;
      });

    return exec;
  }

  //  CREATE ANNEE - SCOLAIRE  ==========================

  async createAnneeScolaire(debut, fin) {
    let exec;
    let sql =
      `insert into annee_scolaire (debut , fin , bCloture ) values ('` +
      debut +
      `', '` +
      fin +
      `','` +
      0 +
      `')`;
    await this.knex.raw(sql).then((res) => {
      exec = res;
    });

    return exec;
  }

  async createDemoAgent() {
    let exec;
    let sql ="INSERT INTO `agent`( `NomAgent`, `PrenomAgent`, `LoginAgent`, `PasswordAgent`, `CodeAgent`) VALUES ('Compte demo' , 'Test' , 'test' ,'1234','DEMOCODE' )";
    await this.knex.raw(sql).then((res) => {
      exec = res;
    });

    return exec;
  }

  async createEcole(data) {
    let exec;
    let sql ="INSERT INTO `etablissement`(`NomEtab`, `CodeEtab`) VALUES ('" + data.Nom + "' , '" + data.Code + "')"
    await this.knex.raw(sql).then((res) => {
      exec = res;
    });

    return exec;
  }
}

//  ===========================================================

var db = new Model();

export default db;

//  ===========================================================
