useEffect(() => {
    const id = localStorage.getItem("currentID");
    axios({
      method: "get",
      url: `http://localhost:3003/api/users/${id}/contacts`
    })
      .then(data => {
        if (data.status === 200) {
          console.log(data.data)
          setData(data.data)
        } else {
          console.log("error");
        }
      })

      .catch(err => {
        console.log(err);
      });
  }, []);