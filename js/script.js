function BinarySearchTree() 
{
    this._root = null;
}
BinarySearchTree.prototype = 
{
    constructor: BinarySearchTree,
    insert: function (node, current) 
    {
        if (node.value < current.value)
        {
            if (current.left === null)
            {
                current.left = node;
            }
            else
            {
                this.insert(node, current.left);
            }
        }
        else if ( node.value > current.value )
        {
            if (current.right === null)
            {
                current.right = node;
            }
            else
            {
                this.insert(node, current.right);
            }
        }
    },
    add: function (value)
    {
        var node =
        {
            value: value,left: null,right: null
        }
        if (this._root === null)
        {
            this._root = node;
        } 
        else
        {
            this.insert(node, this._root);
        }
    },
    findValues: function(value, current, parent)
    {
        if (current === null)
        {
            return null;
        }
        if (value < current.value) 
        {
            return this.findValues(value, current.left, current);
        }
        else if (value > current.value) 
        {
            return this.findValues(value, current.right, current);
        } 
        else
        {
            return current;
        }
     //   console.log('linea 71');
    },
    findValuesParent: function(value, current, parent)
    {
        if (current === null)
        {
            return null;
        }
        if (value < current.value) 
        {
            return this.findValuesParent(value, current.left, current);
        }
        else if (value > current.value) 
        {
            return this.findValuesParent(value, current.right, current);
        } 
        else
        {
            return parent;
        }
    },
    remove: function (value) 
    {
        var replacement = null,replacementParent = null;
        var v = this.findValues(value, this._root, null);
        var p = this.findValuesParent(value, this._root, null);
        if (v !== null)
        {
            var childCount = (v.left !== null ? 1 : 0) + (v.right !== null ? 1 : 0);
            if (v === this._root)
            {
                switch (childCount)
                {
                    case 0:
                        this._root = null;
                        break;
                    case 1:
                        this._root = (v.current.right === null ? v.current.left : v.current.right)
                        break;
                    case 2:
                        replacement = this._root.left;
                        while(replacement.right !== null) 
                        {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }
                        if (replacementParent !== null) 
                        {
                            replacementParent.right = replacement.left;
                            replacement.right = this._root.right;
                            replacement.left = this._root.left;
                        } 
                        else 
                        {
                            replacement.right = this._root.right;
                        }
                        this._root = replacement;
                }
            }
            else 
            {
                switch (childCount) 
                {
                    case 0:
                        if (v.value < p.value) 
                        {
                            p.left = null;
                        } 
                        else 
                        {
                            p.right = null;
                        }
                        break;
                    case 1:
                        if (v.value < p.value) 
                        {
                            p.left = (v.left === null ? v.right : v.left);
                        } 
                        else 
                        {
                            p.right = (p.left === null ? v.right : v.left);
                        }
                        break; 
                    case 2:
                        replacement = v.left
                        replacementParent = v; 
                        while (replacement.right !== null)
                        {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }
                        replacementParent.right = replacement.left;
                        replacement.right = v.current.right;
                        replacement.left = v.current.left;
                        if (v.value < parent.value) 
                        {
                            p.left = replacement;
                        } 
                        else 
                        {
                            p.right = replacement;
                        }
                }
            }
        }

    },
    contains: function (value) 
    {
        return this.findValue(value, this._root);
    }, 
    findValue: function(value, current) 
    {
        if (current === null) 
        {
            return false;
        }
        if (value < current.value) 
        {
            return this.findValue(value, current.left);
        } 
        else if (value > current.value) 
        {
            return this.findValue(value, current.right);
        } 
        else 
        {
            return true;
        }
    },
    traverse: function(process) 
    {
        nodos ="";
        puntos = "";
        var puntitos ="";
        var nodito="";
         edges ="";
        var edgita="";
        
        function inOrder(node) 
        {
            nodito = nodito +"{id: "+ node.value + " label: '" + node.value + "'}," ;
            //console.log(nodito);
            if (node) 
            {
                if (node.left !== null) 
                {
                    edgita = edgita + "{from: " + node.value + " , to: " + node.left.value +" },";
                    puntitos = puntitos + node.value + " -> " + node.left.value +";";
                   // console.log('izquiedo: ',node.left.value,' padre: ', node.value);
                    inOrder(node.left);
                }
                process.call(this, node);
                if (node.right !== null) 
                {
                    edgita = edgita + "{from: " + node.value + " , to: " + node.right.value +" },";
                    puntitos = puntitos + node.value + " -> " + node.right.value + ";";
                   // console.log('derecho: ',node.right.value)
                    inOrder(node.right);
                }
            }
           
            var res = nodito.substr(0,nodito.length - 1);
            var res2 = edgita.substr(0,edgita.length-1);
            var res3 = puntitos.substr(0,puntitos.length-1);
            puntos = "dinetwork { " + res3 + "}";
            edges = res2;
            nodos = res;


        }
        inOrder(this._root);
        cadenaNodo._nodos = nodos;
        cadenaEnlace._enlace = edges;
        cadenaDot._dot = puntos;
        //console.log(cadenaNodo._nodos);
       // console.log(nodos);
       // console.log(edges);
    },
    size: function ()
    {
        var length = 0;
        this.traverse(function(node) 
        {
            length++;
        });
        return length;
    },
    toArray: function () 
    {
        var result = [];
        this.traverse(function(node) 
        {
            result.push(node.value);
        });
        return result;
    },
    toString: function() 
    {
        return this.toArray().toString();
    },

}
var cadenaNodo =
{
    _nodos: "",
    get Onodos() {
        return this._nodos;
    },
    set Onodos(valor) {
        this._nodos = valor;
    }
};
var cadenaEnlace =
    {
        _enlace: "",
        get Oenlace() {
            return this._enlace;
        },
        set Oenlace(valor) {
            this._enlace = valor;
        }
    };
    var cadenaDot =
    {
        _dot: "",
        get Odot() {
            return this._dot;
        },
        set Odot(valor) {
            this._dot = valor;
        }
    };    