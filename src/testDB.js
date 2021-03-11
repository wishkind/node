static insert(student_id, student_name, modules, callback) {
    db.query(
      `INSERT INTO returned (student_id, student_name, modules) VALUES ($1,$2,$3)`,
      [student_id,
        student_name,
        modules
      ],
      function (e, res) {
        if (e.error) {
          return callback(e);
        }
        callback(null, res);
      }
    );
  }

try {
    Submitted.insert(id, name, modules, function (e, result) {
      if (e) {
        return res.json(e);
      }
      return res.json(result);
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }

 onSubmit = () => {
    fetch("api/submitted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: this.state.id,
        student_name: this.state.name,
        modules: this.state.modulesSelected
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("posted:" + res);
        this.setState({ name: "", id: "", modulesSelected: [] });
      });
  };


router.post("/", function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var modules = req.body.modules;

  Submitted.insert(id, name, modules, function (e, result) {
    if (e) {
      return res.json(e);
    }
    return res.json(result);
  });
});
