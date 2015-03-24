# PA-Parser - Prison Architect Savegame Parser
PA-Parser is a savegame-parser for the Introversion prison-management
game "Prison Architect".

This is a stack-based parser. A tokenizer-based approach would
have been nice and probably more elegant but this would have
needed more dependencies as well. The parser, as is, should be pretty
robust anyways.

## Usage
You can look in the test.html-file or simply use it as such:

    var save_obj = pa.parse(savegametextfile);

You can also use the asynchronous wrapper:

    pa.parse_async(savegametextfile, function(save_obj){ ... });

The parser will soon be used in the Prison-Architect Tunnel Finder at
http://maweki.de/pa-tunnelfinder/.

## Dependencies
Underscore is needed in the _-Namespace by the parser.

## Node
If anybody can make this into a fully working node-module that works
within the browser, that would be nice.


## License and Copyright

The Prison Architect property is owned by Introversion.
