# Mannage relations

So far we have created 3 models that have different relationships.  
Can we update these relationships?  
Yes we can, but only with `addRelation` and `removeRelation` functions.  
We should note that we should never manually update the relationships created by `Lesan` with the `update` or `updateMany` function. Let the management of the relationships be entirely in `Lesan's` hands, so that it can always keep them updated and correct.  
Let's use addRelation.

- [Add Relation function](./add_relation_fn.md)
- [Remove Relation function](./remove_relation_fn.md)

