require('ember-runtime/mixins/enumerable');

/**
@module ember
@submodule ember-runtime
*/

var forEach = Ember.EnumerableUtils.forEach;

/**
  This mixin defines the API for modifying generic enumerables. These methods
  can be applied to an object regardless of whether it is ordered or
  unordered.

  Note that an Enumerable can change even if it does not implement this mixin.
  For example, a MappedEnumerable cannot be directly modified but if its
  underlying enumerable changes, it will change also.

  ## Adding Objects

  To add an object to an enumerable, use the `addObject()` method. This
  method will only add the object to the enumerable if the object is not
  already present and the object if of a type supported by the enumerable.

  ```javascript
  set.addObject(contact);
  ```

  ## Removing Objects

  To remove an object form an enumerable, use the `removeObject()` method. This
  will only remove the object if it is already in the enumerable, otherwise
  this method has no effect.

  ```javascript
  set.removeObject(contact);
  ```

  ## Implementing In Your Own Code

  If you are implementing an object and want to support this API, just include
  this mixin in your class and implement the required methods. In your unit
  tests, be sure to apply the Ember.MutableEnumerableTests to your object.

  @class MutableEnumerable
  @namespace Ember
  @extends Ember.Mixin
  @uses Ember.Enumerable
*/
Ember.MutableEnumerable = Ember.Mixin.create(Ember.Enumerable,
  /** @scope Ember.MutableEnumerable.prototype */ {

  /**
    __Required.__ You must implement this method to apply this mixin.

    Attempts to add the passed object to the receiver if the object is not
    already present in the collection. If the object is present, this method
    has no effect.

    If the passed object is of a type not supported by the receiver
    then this method should raise an exception.

    @method addObject
    @param {Object} object The object to add to the enumerable.
    @return {Object} the passed object
  */
  addObject: Ember.required(Function),

  /**
    Adds each object in the passed enumerable to the receiver.

    @method addObjects
    @param {Ember.Enumerable} objects the objects to add.
    @return {Object} receiver
  */
  addObjects: function(objects) {
    Ember.beginPropertyChanges(this);
    forEach(objects, function(obj) { this.addObject(obj); }, this);
    Ember.endPropertyChanges(this);
    return this;
  },

  /**
    __Required.__ You must implement this method to apply this mixin.

    Attempts to remove the passed object from the receiver collection if the
    object is in present in the collection. If the object is not present,
    this method has no effect.

    If the passed object is of a type not supported by the receiver
    then this method should raise an exception.

    @method removeObject
    @param {Object} object The object to remove from the enumerable.
    @return {Object} the passed object
  */
  removeObject: Ember.required(Function),


  /**
    Removes each objects in the passed enumerable from the receiver.

    @method removeObjects
    @param {Ember.Enumerable} objects the objects to remove
    @return {Object} receiver
  */
  removeObjects: function(objects) {
    Ember.beginPropertyChanges(this);
    forEach(objects, function(obj) { this.removeObject(obj); }, this);
    Ember.endPropertyChanges(this);
    return this;
  }

});
